import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import React from 'react';
import Slide from '@material-ui/core/Slide';
import Container from '@material-ui/core/Container';
import { MenuItem } from '@material-ui/core';
import axios from 'axios';
import { useHistory, useParams } from 'react-router-dom';
import formatTime from '../action/formatTime';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    container : {
        marginTop : theme.spacing(2),
    },
    appBar : {
        position: 'relative'
    },
    history: {
        padding: theme.spacing(1),
        display: 'flex',
        justifyContent: 'space-between',
        transition : '200ms',
        '&[active=true]': {
            backgroundColor: theme.palette.action.active,
            color: '#FFF',
            borderLeft : '4px solid black'
        },
        '&[active=true]:hover': {
            paddingTop: theme.spacing(2),
            paddingBottom : theme.spacing(2)
        },
        '&[active=false]:hover': {
            backgroundColor: theme.palette.action.hover,
            cursor: 'pointer',
            paddingTop: theme.spacing(2),
            paddingBottom: theme.spacing(2),
        }
    },
    link: {
        color: '#000',
        textDecoration : 'none',
    }
}))

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const getHistory = (contentid) => {
    return new Promise((resolve, reject) => {
        axios.get("/api/article/getarticlehistory/" + contentid).then(res => {
            if (res.status === 200) {
                resolve(res.data.data)
            } else {
                reject(new Error(res.data))
            }
        })
    })
}

const HistoryDialog = React.forwardRef((props, _ref) => {
    const classes = useStyles();
    
    const [open, setOpen] = React.useState(false);
    const [contentHisory, setContentHistory] = React.useState([]);
    const { contentid } = useParams();

    const handleClick = (toc, i) => {
        setOpen(true);
        props.onClick();
    }
    const handleClose = () => {
        setOpen(false);
    }
    React.useEffect(() => {
        getHistory(contentid).then(res => {
            setContentHistory(res);
        })
    }, [])

    const content = [];
    for (let item of contentHisory) {
        content.push(
            <Link to={`/article/read/${item.Contentid}`} key={item.Contentid} onClick={handleClose} className={classes.link}>
                <div className={classes.history} active={item.Contentid == contentid ? "true" : "false"}>
                    <Typography variant={'p'} >
                        {item.Title}
                    </Typography>
                    <Typography variant={'p'} >
                        {formatTime(new Date(item.Time), true)}
                    </Typography>
                </div>
            </Link>
        )
    }


    return (
        <>
            <MenuItem onClick={handleClick}>查看历史版本</MenuItem>
            <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="h6" >
                            查看历史记录
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Container className={classes.container}>
                    {content}
                </Container>
            </Dialog>
        </>
    )
});

export default HistoryDialog;
