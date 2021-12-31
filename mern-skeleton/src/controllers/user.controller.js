import User from "../models/user.model";
import _ from 'lodash';
import errorHandler from "../helpers/dbErrorHandler";
import formidable from "formidable"
import fs from "fs"
import path from "path"
const create = (req, res, next) => {
    const user = new User(req.body);
    user.save((err, result) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler.getErrorMessage(err)
            })
        }
        res.status(200).json({
            message: "Successfully signed up!"
        })
    })
}
const list = (req, res) => {
    User.find((err, users) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler.getErrorMessage(err)
            })
        }
        res.json(users);
    }).select("name email updated created");
}
const userByID = async (req, res, next, id) => {
    try {
        let user = await User.findById(id).populate("following", "_id name")
            .populate("followers", "_id name")
            .exec()
        if (!user) {
            return res.status("400").json({
                error: "User not found"
            })
        }
        req.profile = user;
        next();
    } catch (err) {
        return res.status("400").json({
            error: "Could not retrive user"
        })
    }
}
const read = (req, res) => {
    req.profile.hashed_password = undefined;
    req.profile.salt = undefined;
    res.status(200).json(req.profile)
}

const update = (req, res, next) => {
    let form = new formidable.IncomingForm()
    form.keepExtensions = true
    form.parse(req, async (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: "Photo could not be uploaded"
            })
        }

        let user = req.profile;
        user = _.extend(user, fields);
        user.updated = Date.now();
        if (files.photo) {
            user.photo.data = fs.readFileSync(files.photo.path)
            user.photo.contentType = files.photo.type
        }
        try {
            await user.save()
            user.hashed_password = undefined;
            user.salt = undefined;
            res.json(user);
        } catch (err) {
            return res.status(400).json({
                error: errorHandler.getErrorMessage(err)
            })
        }
    })
}

const remove = (req, res, next) => {
    let user = req.profile;
    user.remove((err, deletedUser) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler.getErrorMessage(err)
            })
        }
        deletedUser.hashed_password = undefined;
        deletedUser.salt = undefined;
        res.json(deletedUser)
    })
}

const photo = (req, res, next) => {
    if (req.profile.photo.data) {
        res.set("Content-Type", req.profile.photo.contentType)
        return res.send(req.profile.photo.data)
    }
    next()
}

const defaultPhoto = (req, res) => {
    return res.sendFile(path.resolve(
        process.cwd(), '../membership/src/assets/images/paragon.png'
    ))
}

const addFollowing = async (req, res, next) => {
    try {
        await User.findByIdAndUpdate(req.body.userId,
            { $push: { following: req.body.followingId } })
        next()
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}

const addFollower = async (req, res) => {
    try {
        let result = await User.findByIdAndUpdate(req.body.followId,
            { $push: { followers: req.body.userId } }, { new: true }).populate("following", "_id name").populate("followers","_id name").exec()
            result.hashed_password = undefined
            result.salt = undefined
            res.json(result)
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}

const removeFollowing = async(req,res,next) =>{
    try {
        await User.findByIdAndUpdate(req.body.userId,{$pull: {following: req.body.unfollowId}})
        next()
    } catch (error) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}

const removeFollower = async (req, res) => {
    try {
        let result = await User.findByIdAndUpdate(req.body.unfollowId,
            { $pull: { followers: req.body.userId } }, { new: true }).populate("following", "_id name").populate("followers","_id name").exec()
            result.hashed_password = undefined
            result.salt = undefined
            res.json(result)
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}



export default { create, userByID, read, list, remove, update, photo, defaultPhoto, addFollowing,addFollower,removeFollower,removeFollowing }