import { Button, Container, TextField, Paper, Typography, Backdrop, CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import axios from 'axios';
import setAuthToken from '../setAuthToken';
import { handleGetUserinfo } from '../../action/handleGetUserinfo';


const useStyles = makeStyles((theme) => ({
    loginPaper_sm: {
        width: 500,
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
        position: 'relative',
        transform: 'translateY(-50%)',
        margin: "auto"
    },
    loginPaper: {
        paddingTop: theme.spacing(4),
        position: 'absolute',
        margin: 'auto',
        bottom: 0,
        left: 0,
        right: 0,
        top: 0
    },
    container: {
        height: "100%",
        position: 'relative',
        textAlign: "center",
        backgroundColor: 'whitesmoke',
    },
    div: {
        position: "absolute",
        top: '50%',
        left: 0,
        right: 0,
    },
    redfont: {
        color: "red"
    },
    backdrop: {
        color: "#fff",
        zIndex: theme.zIndex.drawer + 1,
        position: "absolute",
    },
    progress: {
        marginTop: theme.spacing(1)
    },
}));


export default function LoginPaper(props) {
    const classes = useStyles();

    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [state, setState] = React.useState("input");

    const useClassName = props.width === 'xs' ? classes.loginPaper : `${classes.loginPaper_sm}`;

    const handleSubmit = () => {
        axios.post('/api/user/login', { Userid: username, Password: password })
            .then(function (response) {
                if (response.status === 200) {
                    const token = response.data.userToken;
                    localStorage.setItem("token", token);
                    setAuthToken(token);
                    handleGetUserinfo();
                    props.handleShowNotice("loginSuccess");
                    setTimeout(() => props.handleClose(), 1000);
                    setState("ok");
                } else {
                    props.handleShowNotice("loginFail");
                    setState("input");
                }
            });
        setState("submit");
    }

    const handleTest = () => {
        axios.get('/api/user/getuserinfo')
            .then((res) => console.log("test jwt"))
    }

    const form = 
    <form autoComplete='on' noValidate>
        <TextField label="用户名" value={username} onChange={e => setUsername(e.target.value)} variant='outlined' margin="dense" fullWidth />
        <TextField label="密码" value={password} onChange={e => setPassword(e.target.value)} variant='outlined' type="password" margin="dense" fullWidth />
        <Button type="submit" color="primary" variant="contained" fullWidth onClick={handleSubmit} style={{ marginTop: 16 }}>
            登录
        </Button>
        <Button fullWidth style={{ marginTop: 24 }} onClick={handleTest}>
            忘记密码？
        </Button>
    </form>;

    const success = 
    <Typography variant="h4">
        登录成功
    </Typography>


    return (
        <div className={classes.container}>
            <div className={props.width !== 'xs' ? classes.div : null}>
                <Paper elevation={3} className={useClassName}>
                    <Container style={{ width: '80%' }}>
                        <Typography variant="h5">
                            博客用户登录
                        </Typography>
                        {state === 'ok' ?success : form}
                    </Container>
                    <Backdrop className={classes.backdrop} open={state === "submit"}>
                        <div>
                            <Typography variant="body1" >
                                正在登录...
                            </Typography>
                            <CircularProgress color="inherit" className={classes.progress} />
                        </div>
                    </Backdrop>
                </Paper>
            </div>
        </div>
    )
}