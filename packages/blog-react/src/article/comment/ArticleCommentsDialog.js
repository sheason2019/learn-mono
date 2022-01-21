import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import CommentsList from './CommentsList';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import PropTypes from "prop-types";
import CommentSnackbar from './CommentSnackbar';

const useStyle = makeStyles((theme) => ({
    input: {
        '& textarea': {
            '&::-webkit-scrollbar': {
                display: 'none'
            }
        }
    },
    content: {
        padding: "0 16px",
    }
}))

export default function ArticleCommentsDialog(props) {
    const classes = useStyle();
    const [scroll, setScroll] = React.useState('paper');
    const [comments, setComments] = React.useState([]);
    const [readOnly, setReadOnly] = React.useState(false);
    const [snackbarState, setSnackbarState] = React.useState({
        open: false,
        variant: "success_comment",
    });
    const [commentInput, setCommentInput] = React.useState("");
    const { contentid } = useParams();

    const commentsCount = () => {
        let count = 0;
        for (let i = 0; i < comments.length; i++) {
            if (comments[i].isdelete === 0) {
                count++;
            }
        }
        return count;
    }
    const handleOnInputChange = (e) => {
        setCommentInput(e.target.value);
    }
    const handleSubmit = async () => {
        const data = {
            content: commentInput,
        }
        setReadOnly(true);
        const res = await axios.post("/api/article/comments/" + contentid, data);
        if (res.status === 200) {
            handleOpenSnackbar("success_comment");
            handleGetComments();
            setReadOnly(false);
            setCommentInput("");
        } else {
            handleOpenSnackbar("fail_comment");
            setReadOnly(false);
        }
    }
    const handleGetComments = async () => {
        const res = await axios.get("/api/article/comments/" + contentid);
        if (res.status === 200) {
            setComments(res.data.comments);
        }
    }
    const handleCloseSnackbar = () => {
        const snackbar = Object.create(snackbarState);
        snackbar.open = false;
        setSnackbarState(snackbar);
    }
    const handleOpenSnackbar = (variant) => {
        const snackbar = Object.create(snackbarState);
        snackbar.open = true;
        snackbar.variant = variant;
        setSnackbarState(snackbar);
    }
    React.useEffect(() => {
        handleGetComments();
    }, []);

    return (
        <Dialog
            open={props.open}
            onClose={props.handleClose}
            scroll={scroll}
            fullWidth
        >
            <DialogTitle id="scroll-dialog-title">评论（共{commentsCount()}条）</DialogTitle>
            <DialogContent
                className={classes.content}
                dividers={scroll === 'paper'}
            >
                <CommentsList
                    comments={comments}
                    setComments={setComments}
                    commentsCount={commentsCount}
                    handleOpenSnackbar={handleOpenSnackbar}
                />
            </DialogContent>
            <DialogActions>
                <TextField
                    className={classes.input}
                    label="评论"
                    onChange={handleOnInputChange}
                    variant="outlined"
                    fullWidth
                    multiline
                    value={commentInput}
                    InputProps={{
                        readOnly: readOnly,
                    }}
                    rowsMax={4}
                />
                <Button onClick={handleSubmit} color="primary">
                    提交
                </Button>
            </DialogActions>
            <CommentSnackbar
                snackbarState={snackbarState}
                handleClose={handleCloseSnackbar}
            />
        </Dialog>
    )
}

ArticleCommentsDialog.propTypes = {
    open: PropTypes.bool.isRequired,
}
