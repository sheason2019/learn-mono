import React from 'react';
import Button from '@material-ui/core/Button';
import LoginDialog from './LoginDialog';
import UserDialog from './UserDialog';
import {store} from '../redux/store';

export default function LoginButton() {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
        setisLogin(userinfo.login)
        console.log(userinfo)
    }
    const handleClose = () => {
        setOpen(false);
    }
    const [userinfo, setUserinfo] = React.useState(store.getState().userinfo);
    const [isLogin, setisLogin] = React.useState();
    store.subscribe(() => {
        const userinfoInRedux = store.getState().userinfo;
        setUserinfo(userinfoInRedux);
        if (!userinfoInRedux.login)
            setOpen(false);
    });

    return (
        <div>
            <Button color="inherit" onClick={handleClickOpen}>
                { userinfo.username || "Login"}
            </Button>
            {DrawerDialog(isLogin,handleClose,open)}
        </div>
    )
}

const DrawerDialog = (isLogin, handleClose, open) => {
    if(!isLogin){
        return <LoginDialog handleClose={handleClose} open={open} />
    } else {
        return <UserDialog handleClose={handleClose} open={open} />;
    }
}