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
        redirectToProfile: false,
        error: ""
    })
    const jwt = auth.isAuthenticated();
    const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value })
    }

    useEffect(() => {
        read({ userId: match.params.userId }, jwt.token)
            .then((data) => {
                setValues({ ...values, email: data.email, name: data.name })
            })
    }, [])

    const clickSubmit = () => {
        const user = {
            name: values.name || undefined,
            email: values.email || undefined,
            password: values.password || undefined,
        };
        update({ userId: match.params.userId }, jwt.token, user).then(data => {
            if (data && data.error) setValues({ ...values, error: data.error });
            else setValues({ ...values, userId: data._id, redirectToProfile: true })
        })
    }
    if (values.redirectToProfile) return <Redirect to={"/user/" + values.userId} />
    return (
        <div>
            <Card className={classes.card}>
                <CardContent>
                    <Typography variant="h6" className={classes.title}>
                        Edit Profile
                    </Typography>
                    <TextField id="name" label="Name" className={classes.textField} value={values.name} onChange={handleChange("name")} margin="normal" /><br />
                    <TextField id="email" type="email" label="Email" className={classes.textField} value={values.email} onChange={handleChange("email")} margin="normal" /><br />
                    <TextField id="password" type="password" label="Password" className={classes.textField} value={values.password} onChange={handleChange("password")} margin="normal" /><br />
                    {values.error && (
                        <Typography component="p" color="error">
                            <Icon color="error" className={classes.error}>error</Icon>{values.error}
                        </Typography>
                    )}
                </CardContent>
                <CardActions>
                    <Button color="primary" variant="contained" onClick={clickSubmit} className={classes.submit}>Submit</Button>
                </CardActions>
            </Card>
        </div>
    )
}

