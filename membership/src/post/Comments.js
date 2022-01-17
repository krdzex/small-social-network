import { Avatar, Card, CardHeader, Icon, IconButton, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import authHelper from '../auth/auth-helper';
import { comment, uncomment } from './api-post';
import { makeStyles } from "@material-ui/core/styles"
import { Link } from 'react-router-dom';
import DeleteIcon from "@material-ui/icons/Delete";

const useStyles = makeStyles({
    commentField: {
        width: "100%"
    }
})

const Comments = (props) => {
    const [text, setText] = useState("")
    const classes = useStyles()
    const jwt = authHelper.isAuthenticated();
    const addComment = (event) => {
        if (event.keyCode == 13 && event.target.value) {
            event.preventDefault()
            comment({ userId: jwt.user._id }, { t: jwt.token }, props.postId, { text: text })
                .then((data) => {
                    if (data.error) {
                        console.log(error)
                    } else {
                        setText("")
                        props.updateComments(data.comments)
                    }
                })
        }
    }

    const onChange = (e) => {
        setText(e.target.value)
    }

    const deleteComment = comment => event => {
        uncomment({ userId: jwt.user._id }, { t: jwt.token }, props.postId, comment)
            .then((data) => {
                if (data.error) {
                    console.log(data.error)
                } else {
                    props.updateComments(data.comments)
                }
            })
    }
    const commentBody = item => {
        return (
            <p className={classes.commentText}>
                <Link to={"/user/" + item.postedBy._id}>{item.postedBy.name}</Link><br />
                {item.text}<br />
                <span className={classes.commentDate}>
                    {(new Date(item.created)).toDateString()} |
                    {authHelper.isAuthenticated().user._id === item.postedBy._id &&
                        <IconButton onClick={deleteComment(item)} className={classes.button} aria-label="Like">
                            <DeleteIcon style={{ color: "blue" }} />
                        </IconButton>}

                </span>
            </p>
        )
    }
    return (
        <Card>
            <CardHeader avatar={<Avatar className={classes.smallAvatar} src={`http://localhost:4400/api/users/photo/${authHelper.isAuthenticated().user._id}`} />}
                title={<TextField onKeyDown={addComment} multiline value={text} onChange={onChange} placeholder='Write something...' className={classes.commentField} margin='normal' />}
                className={classes.cardHeader} />
            {
                props.comments.map((item, i) => {
                    return <CardHeader avatar={<Avatar className={classes.smallAvatar} src={`http://localhost:4400/api/users/photo/${item.postedBy._id}`} />}
                        title={commentBody(item)} className={classes.cardHeader} key={i} />
                })
            }
        </Card>

    );
};

export default Comments;