import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import OptionButton from './OptionButton';
import CommentIcon from '@material-ui/icons/Comment';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import { Button, Container } from '@material-ui/core';
import TOCDialog from './TOCDialog';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import ArticleCommentsDialog from './comment/ArticleCommentsDialog';
import handleGetCommentsNum from "../action/handleGetCommentsNum";
import handleGetLovesNum from "../action/handleGetLovesNum";

const useStyles = makeStyles((theme) => ({
    root: {
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        paddingBottom: 'calc(env(safe-area-inset-bottom) - 15px)',
    },
    appBar: {
        position: 'relative'
    },
    container: {
        marginTop: theme.spacing(2),
    },
    button: {
        display: 'flex',
        flexDirection: 'column',
        width: '25%',
        '& p': {
            marginTop: 0,
            marginBottom: 0,
        },
        '& svg': {
            marginBottom: -theme.spacing(1)
        },
    },
    buttonContainer: {
        display: 'flex'
    },
}));

export default function SimpleBottomNavigation(props) {
    const classes = useStyles();
    const [TOCopen, setTOCopen] = React.useState(false);
    const [commentsOpen, setCommentsOpen] = React.useState(false);
    const [like, setLike] = React.useState(false);
    const { contentid } = useParams();
    const [commentsNum, setCommentsNum] = React.useState("");
    const [lovesNum, setLovesNum] = React.useState("");

    const handleClose = () => {
        setTOCopen(false);
    }
    const handleOpenTOC = () => {
        setTOCopen(true);
    }
    const handleOpenComments = () => {
        setCommentsOpen(true);
    }
    const handleCloseComments = () => {
        setCommentsOpen(false);
    };
    const handleToggleLove = () => {
        setLike(null);
        if (like !== null) {
            axios.post("/api/article/lovearticle/" + contentid)
                .then(res => {
                    handleGetLove();
                }).catch(err => {
                    console.log(err);
                });
        }
    }
    const handleGetLove = () => {
        axios.get("/api/article/lovearticle/" + contentid)
            .then(res => {
                if (res.status === 200) {
                    setLike(res.data.love !== 0);
                } else {
                    setLike(0);
                }
            }).catch(
                err => {
                    console.error(err);
                    setLike(0);
                }
            )
    }
    let heartColor;
    if (like === null) {
        heartColor = 'gray';
    } else if (like) {
        heartColor = 'red';
    } else {
        heartColor = 'black';
    }
    React.useEffect(() => {
        handleGetLove();
        handleGetCommentsNum(contentid, setCommentsNum);
        handleGetLovesNum(contentid, setLovesNum);
    }, [])

    return (
        <>
            <BottomNavigation
                className={`${classes.root} mui-fixed`}
            >
                <TOCDialog open={TOCopen} handleClose={handleClose} />
                <ArticleCommentsDialog open={commentsOpen} handleClose={handleCloseComments }/>
                <Container className={classes.buttonContainer}>
                    <Button onClick={handleOpenTOC} className={classes.button}>
                        <div>
                            <LocationOnIcon />
                            <p>目录</p>
                        </div>
                    </Button>
                    <Button className={classes.button} onClick={handleToggleLove}>
                        <div>
                            <FavoriteIcon style={{ color: heartColor }} />
                            <p>喜欢 {lovesNum}</p>
                        </div>
                    </Button>
                    <Button className={classes.button} onClick={handleOpenComments}>
                        <div>
                            <CommentIcon />
                            <p>评论 {commentsNum}</p>
                        </div>
                    </Button>
                    <OptionButton />
                </Container>
            </BottomNavigation>
            <BottomNavigation className={classes.bottomNavigation} />
        </>
    );
}