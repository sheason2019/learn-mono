import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { ClickAwayListener, Fab } from '@material-ui/core'
import CheckIcon from '@material-ui/icons/Check';
import AddIcon from '@material-ui/icons/Add';

const useStyle = makeStyles((theme) => ({
    root : {
        position : 'relative'
    },
    fab: {
        backgroundColor: props=> props ? theme.palette.secondary.main : theme.palette.primary.main,
        color: '#fff',
        transform : props => props ? 'rotate(135deg)' : null,
        transition : '0.5s',
        '&:action': {
            backgroundColor: props => props ? theme.palette.secondary.dark : theme.palette.primary.dark
        },
        '&:hover': {
            backgroundColor: props=> props ? theme.palette.secondary.main : theme.palette.primary.main,
        },
        zIndex : 10
    },
    submitfab : {
        backgroundColor: theme.palette.primary.main,
        color: '#fff',
        position : 'absolute',
        right : 0,
        bottom : props => props ? 72 : 0,
        '&:action': {
            backgroundColor: theme.palette.primary.dark,
        },
        '&:hover': {
            backgroundColor: theme.palette.primary.main,
        },
        transition : '0.5s',
        zIndex : 9,
        '&:hover .checkicon' : {
            fontSize : 32,
            transition : '0.2s'
        }
    },
    addicon : {
        opacity : props=>props ? 1:0,
        fontSize : props=>props ? 32 : 0,
        position : 'absolute',
        transition : '0.5s'
    },
    submitfont : {
        opacity : props=>!props ? 1:0,
        transition : '0.5s'
    }
}))



export default function PopFab(props) {
    const [open, setOpen] = React.useState(false);

    const classes = useStyle(open);

    const handleToggle = () => {
        setOpen(!open);
    }
    const handleClose = () => {
        setOpen(false);
    }

    const submitButton = <Fab className={classes.submitfab} onClick={props.handleSubmit}><CheckIcon className='checkicon' /></Fab>;

    return (
        <ClickAwayListener onClickAway={handleClose}>
        <div className={classes.root}>
            <Fab className={classes.fab} onClick={handleToggle}>
                <AddIcon className={classes.addicon} />
                <span className={classes.submitfont}>提交</span>
            </Fab>
            {submitButton}
        </div>
        </ClickAwayListener>
    )
}