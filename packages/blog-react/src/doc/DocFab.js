import { ClickAwayListener, Fab, makeStyles } from '@material-ui/core';
import { useState } from 'react';
import AddIcon from '@material-ui/icons/Add';

const useStyle = makeStyles((theme) => ({
    root: {
        position: 'fixed',
        display: 'flex',
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: 'row-reverse',
    },
    fabButtonOrigin: {
        marginBottom: 30,
        marginRight: 30,
        transform: props => props.transform,
        transition: '0.2s',
        zIndex: 3
    },
    fabButtonCancel: {
        bottom: props => props.isOpen ? 100 : 30,
        right: 30,
        transition: '0.2s',
        zIndex: 2
    },
    fabButtonSubmit: {
        bottom: props => props.isOpen ? 170 : 30,
        right: 30,
        transition: '0.2s',
        zIndex: 1,
        backgroundColor: theme.palette.info.main,
        color: "white",
        '&:hover': {
            backgroundColor: theme.palette.info.dark
        }
    },
    transition: {
        transition: '0.2s'
    }
}))
export default function DocFab(props) {
    const [isOpen, setIsOpen] = useState(false);
    let transform = { transform: isOpen ? 'rotate(135deg)' : "", isOpen: isOpen };
    const classes = useStyle(transform);

    const handleSubmit = () => {
        setIsOpen(!isOpen);
        props.setDialogOpen(true);
    }

    return (
        <>
            <div className={`mui-fixed ${classes.root}`}>
                <Fab color="secondary" aria-label="change" onClick={(e) => { setIsOpen(!isOpen); props.setDisplay('write') }} className={classes.fabButtonCancel}>
                    修改
                </Fab>
            </div>
            <div className={`mui-fixed ${classes.root}`}>
                <Fab aria-label="submit" onClick={handleSubmit} className={classes.fabButtonSubmit}>
                    提交
                </Fab>
            </div>
            <div className={`mui-fixed ${classes.root}`}>
                <ClickAwayListener onClickAway={()=>{setIsOpen(false)}} >
                    <Fab color="primary" aria-label="add" onClick={(e) => { setIsOpen(!isOpen) }} className={classes.fabButtonOrigin}>
                        <AddIcon className={classes.transition} fontSize={isOpen ? "large" : "default"} />
                    </Fab>
                </ClickAwayListener>
            </div>
        </>
    )

}