import { MuiThemeProvider, createTheme } from '@material-ui/core/styles';
import {
    indigo,
    pink
} from "@material-ui/core/colors";
import { BrowserRouter } from "react-router-dom";
import MainRouter from "./MainRouter";
import React from "react"


const theme = createTheme({
    palette: {
        primary: {
            light: "#757de8",
            main: "#3f51b5",
            dark: "#002984",
            contrastText: "#fff",
        },
        secondary: {
            light: "#ff79b0",
            main: "#ff4081",
            dark: "#c60055",
            contrastText: "#000",
        },
        openTitle: indigo["400"],
        protectedTitle: pink["400"],
        type: "light"
    }
})


const App = () => {
    return (
        <BrowserRouter>
            <MuiThemeProvider theme={theme}>
                <MainRouter />
            </MuiThemeProvider>
        </BrowserRouter>
    )
}

export default App;