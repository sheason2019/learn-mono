import { Button, Container, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem } from '@material-ui/core';
import axios from 'axios';
import React from 'react';
import { useHistory,useParams } from 'react-router-dom';

export default function DeleteDialog(props) {
    const [open, setOpen] = React.useState(false);
    const history = useHistory();
    const { contentid } = useParams();
    const handleOnClick = () => {
        props.onClick();
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
    }
    const handleSubmit = () => {
        axios.get("/api/article/deletearticle/" + contentid)
            .then(res => {
                if (res.status === 200) {      
                    history.goBack();
                }
                
                console.log(res.data.message)
            }).catch(err => {
            console.log(err)
        })
    }
    return (
        <>
            <MenuItem onClick={handleOnClick}>删除文章</MenuItem>
            <Dialog onClose={handleClose} open={open} maxWidth="sm" fullWidth>
                <DialogTitle>您正在试图删除一篇文章</DialogTitle>
                <DialogContent>
                    <Container>
                        我们正在确认您不是意外触发了这个行为
                    </Container>
                </DialogContent>
                <DialogActions>
                    <Button variant='contained' color='primary' onClick={handleClose }>取消</Button>
                    <Button variant='contained' color='secondary' onClick={handleSubmit}>确认删除</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}