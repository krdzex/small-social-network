import { Avatar, GridList, GridListTile, ImageList, ImageListItem, Typography } from "@material-ui/core"
import React from 'react';
import { makeStyles } from "@material-ui/core/styles"
import PropTypes from "prop-types"
import { Link } from "react-router-dom";

const useStyles = makeStyles({})


export default function FollowGrid(props) {
    const classes = useStyles()
    
    return (
        <div className={classes.root}>
            <ImageList rowHeight={160} className={classes.gridList} cols={4}>
                {props.people.map((person, i) => {
                    return <ImageListItem style={{ "height": 120 }} key={i}>
                        <Link to={"/user/" + person._id}>
                            <Avatar src={`http://localhost:4400/api/users/photo/${person._id}?${new Date().getTime()}`} className={classes.bigAvatar} />
                            <Typography className={classes.tileText}>{person.name}</Typography>
                        </Link>
                    </ImageListItem>
                })}
            </ImageList>
        </div>
    )
}
FollowGrid.propTypes = { people: PropTypes.array.isRequired }
