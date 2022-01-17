import { Card, Divider, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { listNewsFeed } from './api-post';
import authHelper from "../auth/auth-helper"
import { makeStyles } from "@material-ui/core/styles"
import NewPost from './NewPost';
import PostList from './PostList';
import { useParams } from 'react-router';

const useStyles = makeStyles({})

const NewsFeed = () => {
    let params = useParams()
    const classes = useStyles()
    const [posts, setPosts] = useState([])
    const jwt = authHelper.isAuthenticated();

    const addPost = (post) => {
        const updatedPosts = [...posts]
        updatedPosts.unshift(post)
        setPosts(updatedPosts)
    }

    const removePost = (post) => {
        const updatedPosts = [...posts]
        const index = updatedPosts.indexOf(post)
        updatedPosts.splice(index, 1)
        setPosts(updatedPosts)
    }

    useEffect(() => {
        const aborController = new AbortController()
        const signal = aborController.signal

        listNewsFeed({ userId: params.userId}, { t: jwt.token }, signal)
            .then((data) => {
                if (data.error) {
                    console.log(data.error)
                } else {
                    setPosts(data)
                }
            })

        return function cleanup() { aborController.abort() }
    }, [params.userId])
    return (
        <Card>
            <Typography type="title" className={classes.title}>NewsFeed</Typography>
            <Divider />
            <NewPost addUpdate={addPost} />
            <Divider />
            <PostList removeUpdate={removePost} posts={posts} />
        </Card>
    );
};

export default NewsFeed;