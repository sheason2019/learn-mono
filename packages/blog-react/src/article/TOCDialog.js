import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import TOC from './TOC';
import React from 'react';
import Slide from '@material-ui/core/Slide';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
    container : {
        marginTop : theme.spacing(2),
    },
    appBar : {
        position: 'relative'
    },
}))

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function TOCDialog(props) {
    const classes = useStyles();

    return (
        <Dialog fullScreen open={props.open} onClose={props.handleClose} TransitionComponent={Transition}>
            <AppBar className={classes.appBar}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={props.handleClose} aria-label="close">
                        <CloseIcon />
                    </IconButton>
                    <Typography variant="h6" >
                        目录
                    </Typography>
                </Toolbar>
            </AppBar>
            <Container className={classes.container}>
                <TOC toc={props.toc} handleClose={props.handleClose }/>
            </Container>
        </Dialog>
    )
}