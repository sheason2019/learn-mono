import React from "react";
import PropTypes from 'prop-types';
import CommentLabel from './CommentLabel';
import { makeStyles } from '@material-ui/styles';
import { List, ListItem } from '@material-ui/core';
import axios from "axios";

const useStyle = makeStyles((theme) => ({
    empty: {
        textAlign: 'center',
        color: 'gray',
    },
    item: {
        padding: 0,
    },
    root: {
        padding: 0,
    }
}));

export default function CommentsList(props) {
    const classes = useStyle();
    const {
        comments,
        setComments,
        commentsCount,
        handleOpenSnackbar,
    } = props;

    const handleDeleteComment = async (id) => {
        try {
            const res = await axios.delete("/api/article/comments/" + id);
            if (res.status === 200) {
                for (let i = 0; i < comments.length; i++) {
                    if (comments[i].id == id) {
                        const _comments = Object.create(comments);
                        _comments[i].isdelete = 1;
                        setComments(_comments);
                        break;
                    }
                }
                handleOpenSnackbar("success_delete");
                return true;
            }
        } catch {
            handleOpenSnackbar("fail_delete");
            return false;
        }
    }
    const showDivider = (comment, index) => {
        if (index === comments.length || comment.isdelete === 1) {
            return false;
        } else {
            let result = false;
            for (let i = index + 1; i < comments.length; i++) {
                if (comments[i].isdelete === 0) {
                    result = true;
                    break;
                }
            }
            return result;
        }
    }
    const handleCloseEmpty = () => {
        const empty = document.getElementById("comments-is-empty");
        empty.style.height = 0;
        empty.style.padding = 0;
        empty.style.overflow = "hidden";
        empty.style.transition = "400ms";
    }
    const handleOpenEmpty = () => {
        const empty = document.getElementById("comments-is-empty");
        empty.style.height = empty.scrollHeight + "px";
        empty.style.padding = "16px 0";
    }

    React.useEffect(() => {
        if (commentsCount() === 0) {
            setTimeout(handleOpenEmpty,400);
        } else {
            handleCloseEmpty();
        }
    }, [comments]);
    React.useEffect(() => {
        handleCloseEmpty();
     }, []);

    return (
        <List className={classes.root}>
            <div className={classes.empty} id="comments-is-empty">
                暂时没有评论...
            </div>
            {comments.map((comment, index) => (
                <ListItem
                    key={index}
                    className={classes.item}
                    divider={showDivider(comment, index)}
                >
                    <CommentLabel
                        comment={comment}
                        handleDeleteComment={handleDeleteComment}
                    />
                </ListItem>
            ))}
        </List>
    )

}

CommentsList.propsTypes = {
    comments: PropTypes.array.isRequired,
}