import { Avatar, Card, CardActions, CardContent, CardHeader, IconButton, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import authHelper from '../auth/auth-helper';
import DeleteIcon from "@material-ui/icons/Delete";
import { makeStyles } from "@material-ui/core/styles"
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import CommentIcon from '@material-ui/icons/Comment';
import { like, remove, unlike } from './api-post';
import Comments from './Comments';

const useStyles = makeStyles(theme => ({
    media: {
        maxHeight: "500px"
    }
}))


const Post = (props) => {
    const jwt = authHelper.isAuthenticated();
    const [values, setValues] = useState({
        like: false,
        likes: 0,
        comments: []
    })

    useEffect(() => {
        setValues({
            like: checkLike(props.post.likes),
            likes: props.post.likes.length,
            comments: props.post.comments
        })
    }, [props])

    const checkLike = (likes) => {
        let match = likes.indexOf(jwt.user._id) !== -1
        return match
    }

    const classes = useStyles()
    const deletePost = () => {
        remove({ postId: props.post._id }, { t: jwt.token })
            .then((data) => {
                if (data.error) {
                    console.log(data.error)
                } else {
                    props.onRemove(props.post)
                }
            })
    }
    const clickLike = () => {
        let callApi = values.like ? unlike : like
        callApi({ userId: jwt.user._id }, { t: jwt.token }, props.post._id)
            .then((data) => {
                if (data.error) {
                    console.log(data.error)
                } else {
                    setValues({ ...values, like: !values.like, likes: data.likes.length })
                }
            })
    }

    const updateComments = (newComments) => {
        setValues({ ...values, comments: newComments })
    }

    return (
        <Card>
            <CardHeader avatar={<Avatar src={`http://localhost:4400/api/users/photo/${props.post.postedBy._id}`} />}
                action={props.post.postedBy._id === authHelper.isAuthenticated().user._id && <IconButton onClick={deletePost}><DeleteIcon /></IconButton>
                }
                title={<Link to={"/user/" + props.post.postedBy._id}>{props.post.postedBy.name}</Link>}
                subheader={(new Date(props.post.created)).toDateString()}
                className={classes.cardHeader} />
            <CardContent className={classes.cardContent}>
                <Typography component="p" className={classes.text}>
                    {props.post.text}
                </Typography>
                {
                    props.post.photo && (
                        <div className={classes.photo}>
                            <img className={classes.media} src={`http://localhost:4400/api/posts/photo/${props.post._id}`} />
                        </div>
                    )
                }
            </CardContent>
            <CardActions>
                {values.like ?
                    <IconButton onClick={clickLike} className={classes.button} aria-label="Like">
                        <FavoriteIcon style={{ color: "red" }} />
                    </IconButton>
                    : <IconButton onClick={clickLike} className={classes.button} aria-label="Unlicke">
                        <FavoriteBorderIcon />
                    </IconButton>}<span>{values.likes}</span>

                <IconButton className={classes.button} aria-label="Comment" color="secondary">
                    <CommentIcon />
                </IconButton><span>{values.comments.length}</span>
            </CardActions>
            <Comments postId={props.post._id} comments={values.comments} updateComments={updateComments} />
        </Card>
    );
};

export default Post;