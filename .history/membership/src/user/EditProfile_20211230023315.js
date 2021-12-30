import React, { useEffect, useState } from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Icon from "@material-ui/core/Icon";
import { makeStyles } from "@material-ui/core/styles";
import { update, read } from "./api-user";
import auth from "./../auth/auth-helper"
import { Redirect } from "react-router";
import FileUpload from "@material-ui/icons/AddPhotoAlternate"
const useStyles = makeStyles(theme => ({
    card: {
        maxWidth: 600,
        margin: "auto",
        textAlign: "center",
        marginTop: theme.spacing(5),
        paddingBottom: theme.spacing(2)
    },
    error: {
        verticalAlign: "middle"
    },
    title: {
        marginTop: theme.spacing(2),
        color: theme.palette.openTitle
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 300
    },
    submit: {
        margin: "auto",
        marginBottom: theme.spacing(2)
    }
}))

export default function EditProfile({ match }) {
    const classes = useStyles();
    const [values, setValues] = useState({
        userId: "",
        name: "",
        password: "",
        email: "",
        about: "",
        redirectToProfile: false,
        photo: "",
        error: ""
    })
    const jwt = auth.isAuthenticated();
    const handleChange = name => event => {
        const value = name === "photo" ? event.target.files[0] : event.target.value;
        setValues({ ...values, [name]: value })
    }

    useEffect(() => {
        read({ userId: match.params.userId }, jwt.token)
            .then((data) => {
                setValues({ ...values, email: data.email, name: data.name })
            })
    }, [])

    const clickSubmit = () => {
        let userData = new FormData()
        userData.append("name", values.name)
        userData.append("email", values.email)
        userData.append("password", values.password)
        userData.append("about", values.about)
        userData.append("photo", values.photo)

        update({ userId: match.params.userId }, jwt.token, userData).then(data => {
            if (data && data.error) setValues({ ...values, error: data.error });
            else setValues({ ...values, userId: data._id, redirectToProfile: true })
        })
    }
    if (values.redirectToProfile) return <Redirect to={"/user/" + values.userId} />
    return (
        <div>
            <Card className={classes.card}>
            <form onSubmit={(e) => onSubmit(e)} encType="multipart/form-data">
                <CardContent>
                    <Typography variant="h6" className={classes.title}>
                        Edit Profile
                    </Typography>
                    <input accept="image/*" type="file" encType="multipart/form-data" onChange={handleChange("photo")} className={classes.input} style={{ display: "none" }} id="icon-button-file" />
                    <label htmlFor="icon-button-file">
                        <Button variant="contained" color="default" component="span">
                            Upload <FileUpload />
                        </Button>
                    </label>
                    <span className={classes.filename}>
                        {values.photo ? values.photo.name : ""}
                    </span>
                    <TextField id="name" label="Name" className={classes.textField} value={values.name} onChange={handleChange("name")} margin="normal" /><br />
                    <TextField id="email" type="email" label="Email" className={classes.textField} value={values.email} onChange={handleChange("email")} margin="normal" /><br />
                    <TextField id="about" multiline rows={2} label="About" className={classes.textField} value={values.about} onChange={handleChange("about")} margin="normal" /><br />
                    <TextField id="password" type="password" label="Password" className={classes.textField} value={values.password} onChange={handleChange("password")} margin="normal" /><br />
                    {values.error && (
                        <Typography component="p" color="error">
                            <Icon color="error" className={classes.error}>error</Icon>{values.error}
                        </Typography>
                    )}
                </CardContent>
                <CardActions>
                    <Button color="primary" type="submit" variant="contained" className={classes.submit}>Submit</Button>
                </CardActions>
                </form>
            </Card>
        </div>
    )
}

