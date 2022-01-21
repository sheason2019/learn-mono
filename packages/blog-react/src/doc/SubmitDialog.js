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
    }
}))

export default function SubmitDialog(props){
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
            <DialogTitle style={{textAlign:'right',borderBottom:'1px solid lightgray'}}>
                <Grid container justify="space-between">
                    <Grid item>
                            发布文章
                    </Grid>
                    <Grid item>
                        <IconButton size="small" edge="start" color='inherit' onClick={handleClose} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                    </Grid>
                </Grid>
            </DialogTitle>
            <DialogContent>
                <DialogContentText style={{paddingBottom:8}}>
                    <TextField
                        select
                        label="选择版块"
                        value={props.currency}
                        fullWidth
                        margin="dense"
                        variant="outlined"
                        onChange={e=>props.setCurrency(e.target.value)}
                    >
                        {props.currencies.map((option) => (
                            <MenuItem key={option.Groupid} value={option.Groupid} >
                                {option.Grouptitle}
                            </MenuItem>
                        ))}
                        <MenuItem key={'new'} value={'new'} >
                            新建分组
                        </MenuItem>
                    </TextField>
                    {props.currency === 'new' ? input : null}
                    <Typography variant="body1">
                        请选择文章将发布到的文章组。
                    </Typography>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleSubmit} color="primary">
                    确定提交
                </Button>
            </DialogActions>
        </Dialog>
    )
}