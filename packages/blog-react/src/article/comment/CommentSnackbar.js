import Proptypes from "prop-types";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import React from 'react';

export default function CommentSnackbar(props) {
    const { snackbarState, handleClose } = props;
    const { variant, open } = snackbarState;

    let alert;

    if (variant === "success_comment") {
        alert = <SuccessAlert handleClose={handleClose}>添加评论成功</SuccessAlert>
    } else if (variant === "fail_comment") {
        alert = <FailAlert handleClose={handleClose}>添加评论失败</FailAlert>
    } else if (variant === "success_delete") {
        alert = <SuccessAlert handleClose={handleClose}>删除评论成功</SuccessAlert>
    } else if (variant === "fail_delete") {
        alert = <FailAlert handleClose={handleClose}>删除评论失败</FailAlert>
    }
    return (
        <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
            {alert}
        </Snackbar>
    )
}

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function SuccessAlert(props) {
    const { handleClose } = props;
    return (
        <Alert onClose={handleClose} severity="success">
            {props.children}
        </Alert>
    )
}

function FailAlert(props) {
    const { handleClose } = props;
    return (
        <Alert onClose={handleClose} severity="error">
            {props.children}
        </Alert>
    )
}

CommentSnackbar.propTypes = {
    variant: Proptypes.oneOf([
        "success_comment",
        "fail_comment",
        "success_delete",
        "fail_delete",
    ]),
    handleClose: Proptypes.func.isRequired,
    open: Proptypes.bool.isRequired,
}
