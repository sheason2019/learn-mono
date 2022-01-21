import React from "react";
import PropTypes from "prop-types";
import { Avatar, Button, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { useTheme } from "@material-ui/core/styles";
import formatTime from "../../action/formatTime";
import { useMediaQuery } from "@material-ui/core";
import { useParams } from "react-router-dom";
import CommentDelete from "./CommentDelete";
import {store} from '../../redux/store';

const useStyle = makeStyles((theme) => ({
    root: {
        padding: "16px 0",
        transition: "400ms",
        "&[isdelete='1']": {
            height: 0,
            overflow: "hidden",
            padding: 0,
        }
    },
    avatar: {
        border: "1px solid gray",
    },
    stretch: {
        flexGrow: 2,
    },
    time: {
        color: 'gray',
    },
    userid: {
        fontWeight: 500,
    },
    content: {
        paddingLeft: 50,
        paddingBottom: 8,
    },
    helptext: {
        fontSize: "0.75rem",
        color: "gray",
    }
}));

const handleShowDelete = (userinfo, comment) => {
    if (userinfo.usertype === 9 || comment.userid === userinfo.userid) {
        return true;
    } else {
        return false;
    }
}

const getAvatarSrc = (comment) => {
    let avatarSrc = null;
    if (comment.userid !== "未登录用户") {
        avatarSrc = "/api/user/getavatar/" + comment.userid;
    }
    return avatarSrc;
}

export default function CommentLabel(props) {
    const { comment } = props;
    const { contentid, id } = comment;
    const [userinfo, setUserinfo] = React.useState(store.getState().userinfo);
    
    const classes = useStyle();
    const theme = useTheme();

    const time = new Date(comment.time);
    const showTimeDetail = !useMediaQuery(theme.breakpoints.down("xs"));
    const timeStr = formatTime(time, showTimeDetail);

    const avatarSrc = getAvatarSrc(comment);    
    const domId = "comment-id-" + id;
    const handleDeleteComment = async () => {
        if (await props.handleDeleteComment(id)) {
            const div = document.getElementById(domId);
            div.style.height = 0;
        }
    }

    let commentHelptext = null;
    if (parseInt(useParams().contentid) !== contentid) {
        commentHelptext = <CommentNotInThisContent />;
    }
    let deleteButton = null;
    if (handleShowDelete(userinfo, comment)) {
        deleteButton = (
            <CommentDelete
                handleDeleteComment={handleDeleteComment}
                id={id.toString()}
            />
        );
    }
    React.useEffect(() => {
        if (comment.isdelete !== 1) {
            const div = document.getElementById(domId);
            div.style.height = div.scrollHeight + "px";
        }
    }, []);

    return (
        <Grid container id={domId} className={classes.root} isdelete={comment.isdelete}>
            <Grid
                item
                container
                spacing={1}
                xs={12}
            >
                <Grid item>
                    <Avatar
                        src={avatarSrc}
                        className={classes.avatar}
                    />
                </Grid>
                <Grid item className={classes.userid}>
                    {comment.userid}
                </Grid>
                <div className={classes.stretch} />
                <Grid item className={classes.time}>
                    {timeStr}
                </Grid>
            </Grid>
            <Grid item xs={12} className={classes.content}>
                {comment.content}
            </Grid>
            {commentHelptext}
            <Grid
                item
                container
                direction="row-reverse"
                xs={12}
            >
                <Button>
                    回复(0)
                </Button>
                <Button>
                    踩(0)
                </Button>
                <Button>
                    赞(0)
                </Button>
                <div className={classes.stretch} />
                {deleteButton}
            </Grid>
        </Grid>
    )
}

function CommentNotInThisContent(props) {
    const classes = useStyle();
    return (
        <Grid item xs={12} className={`${classes.content} ${classes.helptext}`}>
            评论发布于该文章的其他版本
        </Grid>
    )
}

CommentLabel.propTypes = {
    comment: PropTypes.object.isRequired,
}