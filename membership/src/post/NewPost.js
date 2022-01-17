import { Button, Card, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import { create } from './api-post';
import authHelper from "../auth/auth-helper"
import FileUpload from "@material-ui/icons/AddPhotoAlternate"
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles({})

const NewPost = (props) => {
    const classes = useStyles()
    const jwt = authHelper.isAuthenticated();
    const [values, setValues] = useState({ text: "", photo: "" })
    const clickPost = () => {
        let postData = new FormData()
        postData.append("text", values.text)
        postData.append("photo", values.photo)
        create({ userId: jwt.user._id }, { t: jwt.token }, postData)
            .then((data) => {
                if (data.error) {
                    setValues({ ...values, error: data.error })
                } else {
                    setValues({ ...values, text: "", photo: "" })
                    props.addUpdate(data)
                }
            })
    }


    const handleChange = name => event => {
        const value = name === "photo" ? event.target.files[0] : event.target.value;
        setValues({ ...values, [name]: value })
    }


    return (
        <Card>
            <TextField
                label="Share your thoughts"
                multiline
                rows={5}
                fullWidth
                margin='normal'
                value={values.text}
                onChange={handleChange("text")}
                error={values.error !== undefined}
                helperText={values.error ? "Text is required" : ""}
            />
            <div style={{ display: "flex", justifyContent: "space-between", margin: "20px 10px" }}>
                <div>
                    <input accept="image/*" type="file" encType="multipart/form-data" onChange={handleChange("photo")} className={classes.input} style={{ display: "none" }} id="icon-button-file" />
                    <label htmlFor="icon-button-file">
                        <Button variant="contained" color="default" component="span" xs={{ flex: 1 }}>
                            Upload <FileUpload />
                        </Button>
                    </label>
                    <span className={classes.filename}>
                        {values.photo ? values.photo.name : ""}
                    </span>
                </div>
                <Button variant="contained" color="primary" component="span" onClick={clickPost}>
                    Post
                </Button>
            </div>


        </Card>
    );
};

export default NewPost;