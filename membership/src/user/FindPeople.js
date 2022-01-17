import { Avatar, Button, IconButton, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, Snackbar } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { findPeople, follow } from './api-user';
import { makeStyles } from "@material-ui/core/styles"
import authHelper from '../auth/auth-helper';
import VisibilityIcon from '@material-ui/icons/Visibility';

const useStyles = makeStyles({})


const FindPeople = () => {
    const jwt = authHelper.isAuthenticated();
    const classes = useStyles()
    const [values, setValues] = useState({ users: [] })
    const clickFollow = (user, index) => {
        follow({ userId: jwt.user._id }, { t: jwt.token }, user._id)
            .then((data) => {
                if (data.error) { console.log(data.error) }
                else {
                    let toFollow = values.users
                    toFollow.splice(index, 1)
                    setValues({ ...values, users: toFollow, open: true, followMessage: `Following ${user.name}` })
                }
            })
    }

    useEffect(() => {
        const abortController = new AbortController()
        const signal = abortController.signal

        findPeople({
            userId: jwt.user._id
        }, {
            t: jwt.token
        }, signal).then((data) => {
            if (data && data.error) {
                console.log(error)
            } else {
                setValues({ ...values, users: data })
            }
        })
        return function cleanup() {
            abortController.abort()
        }
    }, [])
    const handleRequestClose = () => {
        setValues({ ...values, open: false })
    }
    return (
        <List>
            {values.users.map((item, i) => {
                return <span key={i}>
                    <ListItem>
                        <ListItemAvatar className={classes.avatar}>
                            <Avatar src={`http://localhost:4400/api/users/photo/${item._id}?${new Date().getTime()}`} className={classes.bigAvatar} />
                        </ListItemAvatar>
                        <ListItemText primary={item.name} />
                        <ListItemSecondaryAction className={classes.follow}>
                            <Link to={"/user/" + item._id}>
                                <IconButton aria-label="Edit" color="primary">
                                    <VisibilityIcon />
                                </IconButton>
                            </Link>
                            <Button aria-label="Follow" variant='contained' color="secondary" onClick={() => { clickFollow(item, i) }}>
                                Follow
                            </Button>
                        </ListItemSecondaryAction>

                    </ListItem>
                </span>
            })}
            <Snackbar anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                open={values.open} onClose={handleRequestClose} autoHideDuration={6000}
                message={<span className={classes.snack}>{values.followMessage}</span>} />
        </List>
    );
};

export default FindPeople;