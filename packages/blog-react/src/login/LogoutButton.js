import {
    Button,
    Dialog,
    Grid,
    makeStyles,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
} from "@material-ui/core";
import React from "react";
import handleLogoutAction from '../action/handleLogout';

const useStyle = makeStyles((theme) => ({
    logout: {
        padding: theme.spacing(2),
    },
}));

export default function LogoutButton(props) {
    const classes = useStyle();
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleLogout = () => {
        setOpen(false);
        handleLogoutAction();
    };

    return (
        <Grid container justify="center" className={classes.logout}>
            <Grid item xs={12}>
                <Button
                    fullWidth
                    onClick={handleClickOpen}
                    color="secondary"
                    variant="contained"
                    className={classes.logoutButton}
                >
                    退出登录
        </Button>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle>确定要退出登录吗？</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            未登录状态下将有部分功能被禁止使用
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            保持登录
                        </Button>
                        <Button onClick={handleLogout} color="primary" autoFocus>
                            确定退出
                        </Button>
                    </DialogActions>
                </Dialog>
            </Grid>
        </Grid>
    );
}
