import { Grid ,Button , Typography, IconButton, Dialog,DialogActions,DialogContent,DialogContentText,MenuItem,TextField } from '@material-ui/core';
import React from 'react';
import CloseIcon from '@material-ui/icons/Close';
import DialogTitle from '@material-ui/core/DialogTitle'
import {makeStyles} from '@material-ui/core/styles';

const useStyle = makeStyles((theme)=>({
    dialog : {
        paddingTop : theme.spacing(2),
        paddingBottom : theme.spacing(2)
    },
    closebutton : {
        marginLeft : 'auto'
    },
    dialogTitle: {
        textAlign: 'right',
        borderBottom: '1px solid lightgray',
    },
    text: {
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1)
    }
}))

export default function ChangeArticleDialog(props){
    const {open} = props;
    const classes = useStyle();

    const handleClose = () => {
        props.setOpen(false);
    }

    const handleSubmit = () => {
        props.handleSubmit();
    }

    const input =
        <TextField 
            value={props.newGroupname}
            onChange={e=>props.setNewGroupname(e.target.value)}
            fullWidth 
            variant="outlined"
            margin="dense"
            label="新版块名称"/>;
    return (
        <Dialog 
            className={classes.dialog}
            aria-labelledby='simple-dialog-title' 
            maxWidth="sm"
            fullWidth
            margin="dense"
            scroll="body"
            open={open}>
            <DialogTitle className={classes.dialogTitle}>
                <Grid container justify="space-between">
                    <Grid item>
                            修改文章
                    </Grid>
                    <Grid item>
                        <IconButton size="small" edge="start" color='inherit' onClick={handleClose} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                    </Grid>
                </Grid>
            </DialogTitle>
            <DialogContent>
                <DialogContentText className={classes.text}>
                    是否提交本次修改的内容
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    取消
                </Button>
                <Button onClick={handleSubmit} color="primary">
                    确定提交
                </Button>
            </DialogActions>
        </Dialog>
    )
}