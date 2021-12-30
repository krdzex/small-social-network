import React from "react";
import { makeStyles } from "@material-ui/styles";
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import seashell from "./../assets/images/seashell.jpg"

const styles = makeStyles(theme => ({
    card: {
        maxWidth: 600,
        margin: "auto",
        marginTop: theme.spacing(5),
        marginBottom: theme.spacing(5)
    },
    title: {
        padding: `${theme.spacing(3)}px ${theme.spacing(2)}px`,
        color: theme.palette.text.secondary,
    },
    media: { minHeight: 330 },
}))

const Home = () => {
    const classes = styles();
    return (
        <div>
            <Card className={classes.card}>
                <Typography variant="h5" component="h2" className={classes.title}>
                    Home Page
                </Typography>
                <CardMedia className={classes.media} image={seashell} title="Unicorn Shells" />
                <CardContent>
                    <Typography variant="body1" component="p">
                        Welcome to the Membership home page
                    </Typography>
                </CardContent>
            </Card>
        </div>
    )
}

export default Home;