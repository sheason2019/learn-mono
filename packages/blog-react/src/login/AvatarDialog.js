import { Avatar, Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import axios from 'axios';
import React from 'react';

const useStyle = makeStyles((theme) => ({
    avator: {
        width: 100,
        height: 100,
        background: "lightgray",
        borderRadius: 100,
        marginLeft: "auto",
        marginRight: "auto",
        marginBottom: theme.spacing(1),
    },
    container: {
        textAlign: 'center'
    },
    avatarinput: {
        display : 'none'
    }
}))

export default function UserinfoAvatar(props) {
    const classes = useStyle();
    const [open, setOpen] = React.useState(false);

    const [avatar, setAvatar] = React.useState("/api/user/getavatar/"+props.userid);
    const [avatarFile, setAvatarFile] = React.useState(null);

    const [oldAvatar, setOldAvatar] = React.useState("/api/user/getavatar/" + props.userid);

    const handleClose = () => {
        setOpen(false);
    }
    const handleClickOpen = () => {
        setOpen(true);
    }
    const handleChangeAvatar = () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        document.getElementById("input").appendChild(input);
        input.click();
        input.addEventListener("change", function () {
            const file = input.files[0];
            if (file.size >= 5 * 1000 * 1000) {
                alert("图像大小最多为5M！");
                return;
            }
            const filereader = new FileReader();
            filereader.onload = function () {
                setAvatar(this.result);
                setAvatarFile(file);
            }
            filereader.readAsDataURL(file);
        })
    }
    const handleSubmit = () => {
        const formData = new FormData();
        formData.append('img', avatarFile);
        axios.post('/api/user/setavatar', formData, {
            'Content-Type':'multipart/form-data'
        }).then(res => {
            console.log(res);
            setOpen(false);
            setOldAvatar(avatar);
        })
    }
    return (
        <>
            <Avatar className={classes.avator} src={oldAvatar} onClick={handleClickOpen}></Avatar>
            <Dialog onClose={handleClose} maxWidth='xs' fullWidth open={open}>
                <DialogTitle>更换头像</DialogTitle>
                <DialogContent className={classes.container}>
                    <Avatar src={ avatar} className={classes.avator} onClick={handleChangeAvatar}></Avatar>
                    <Typography variant='body' className={classes.helptext}>
                        点击选择头像
                    </Typography><br />
                    <div id='input' className={ classes.avatarinput}/>
                    <Typography variant='body' className={classes.helptext}>
                        *上传的文件必须为图像格式，文件大小最多为5M
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleSubmit} color='primary'>提交</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}