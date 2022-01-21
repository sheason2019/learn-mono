import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@material-ui/core";
import PropTypes from "prop-types";
import React from "react";

export default function CommentDelete(props) {
    const handleDelete = () => {
        props.handleDeleteComment();
        handleClose();
    }
    const handleOnClick = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const [open, setOpen] = React.useState(false);
    return (
        <>
            <Button color="secondary" onClick={handleOnClick}>
                删除评论
            </Button>
            <Dialog
                open={open}
                maxWidth="xs"
                onClose={handleClose}
                fullWidth
            >
                <DialogTitle>警告！</DialogTitle>
                <DialogContent>
                    是否确认要删除这条评论？
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" color="primary" onClick={handleClose}>
                        取消
                    </Button>
                    <Button variant="contained" color="secondary" onClick={handleDelete}>
                        确认删除
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

CommentDelete.propTypes = {
    id: PropTypes.string.isRequired,
}
