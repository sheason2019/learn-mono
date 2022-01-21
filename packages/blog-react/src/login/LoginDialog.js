import { AppBar, Button, Dialog, IconButton, Toolbar, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import React from 'react';
import Slide from '@material-ui/core/Slide';
import withWidth from '@material-ui/core/withWidth';
import RegistPaper from './Paper/RegistPaper';
import LoginPaper from './Paper/LoginPaper';
import NotiSnackBar from './NotiSnackBar';

const useStyles = makeStyles((theme) => ({
    appBar: {
        position: 'relative',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
})

function LoginDialog(props) {
    const classes = useStyles();
    const [type, setType] = React.useState("login");
    const [showNotice,setShowNotice] = React.useState(false);
    const [noticeType,setNoticeType] = React.useState("null");

    const handleSetType = (e) => {
        setType(type === 'login' ? 'regist' : 'login');
    }
    const handleCloseNotice = () => {
        setShowNotice(false);
    }
    const handleShowNotice = (type) => {
        setShowNotice(true);
        setTimeout(()=>setShowNotice(false),3000);
        setNoticeType(type);
    }

    const { width } = props;

    return (
        <Dialog fullScreen open={props.open} onClose={props.handleClose} TransitionComponent={Transition}>
            <AppBar className={classes.appBar}>
                <Toolbar>
                    <IconButton edge="start" color='inherit' onClick={props.handleClose} aria-label="close">
                        <CloseIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        请登录您的账户
                    </Typography>
                    <Button autoFocus color='inherit' onClick={handleSetType}>
                        点击{type === "login" ? "注册" : "登录"}
                    </Button>
                </Toolbar>
            </AppBar>
            {LoginOrRegist(type, width, props.handleClose,handleShowNotice)}
            <NotiSnackBar open={showNotice} type={noticeType} handleClose={handleCloseNotice}/>
        </Dialog>
    )
}

const LoginOrRegist = (type, width, handleClose,handleShowNotice) => {
    const obj = {
        login: <LoginPaper width={width} handleClose={handleClose} handleShowNotice={handleShowNotice}/>,
        regist: <RegistPaper width={width} handleClose={handleClose} handleShowNotice={handleShowNotice} />
    };
    return eval("obj." + type);
}

export default withWidth()(LoginDialog);