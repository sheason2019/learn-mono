import { Button, Container, Paper, TextField, Typography, Backdrop, CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import axios from 'axios';
import { handleGetUserinfo } from '../../action/handleGetUserinfo';
import setAuthToken from '../setAuthToken';

const useStyles = makeStyles((theme) => ({
    registPaper_sm: {
        width: 500,
        paddingTop: theme.spacing(4),
        paddingBottom : theme.spacing(4),
        position: 'relative',
        transform : 'translateY(-50%)',
        margin : "auto"
    },
    loginPaper:{
        paddingTop: theme.spacing(4),
        position: 'absolute',
        margin: 'auto',
        bottom: 0,
        left: 0,
        right: 0,
        top: 0
    },
    container: {
        height: "100%",
        position: 'relative',
        textAlign: "center",
        backgroundColor: 'whitesmoke',
    },
    div : {
        position : "absolute",
        top : '50%',
        left : 0,
        right : 0,
    },
    backdrop: {
        color: "#fff",
        zIndex: theme.zIndex.drawer + 1,
        position: "absolute",
    },
    progress: {
        marginTop: theme.spacing(1)
    },
}));

export default function RegistPaper(props) {
    const classes = useStyles();

    const useClassName = props.width === 'xs' ? classes.loginPaper : `${classes.registPaper_sm}`;

    const [username,setUsername] = React.useState({valid:true,value:'',error:''});
    const [password,setPassword] = React.useState({valid:true,value:'',error:''});
    const [repassword,setRepassword] = React.useState({valid:true,value:'',error:''});
    const [phone,setPhone] = React.useState({valid:true,value:'',error:''});
    const [state,setState] = React.useState("input");

    const handleChangeValue = (e) => {
        if(e.target.name === 'phone'){
            if(!/^[0-9]{0,11}$/.test(e.target.value)) return;
        }

        const newFieldObj = {value:e.target.value,valid: true,error:''};
        switch(e.target.name){
            case 'username' : {
                setUsername(newFieldObj);
            }break;
            case 'password' : {
                setPassword(newFieldObj);
            }break;
            case 'repassword' : {
                setRepassword(newFieldObj);
            }break;
            case 'phone' : {
                setPhone(newFieldObj);
            }
        }
    }

    const validateUsername = () => {
        const newUsername = {...username};
        let flag = 0;
        if(newUsername.value.length < 6){
            newUsername.valid = false;
            newUsername.error = '用户名不应少于6个字符';
            flag = 1;
        } else if(/^[\s1-9]/.test(newUsername.value)){
            newUsername.valid = false;
            newUsername.error = '用户名不能以数字或空格作为开头';
            flag = 1;
        }
        if(flag === 0){
            checkUsername();
        } else{
            setUsername(newUsername);
        }   
    }

    const validatePassword = () => {
        const newPassword = {...password};
        if(newPassword.value.length < 6){
            newPassword.valid = false;
            newPassword.error = '密码不应少于6个字符';
        }
        setPassword(newPassword);
        validateRepassword();
    }
    const validateRepassword = () => {
        const newRepassword = {...repassword,valid:true,error:''};
        if(newRepassword.value !== password.value){
            newRepassword.valid = false;
            newRepassword.error = '两次输入的密码必须一致';
        } else if(newRepassword.value.length === 0){
            newRepassword.valid = false;
            newRepassword.error = '密码不应少于6个字符';
        }
        setRepassword(newRepassword);
    }
    const validatePhone = () => {
        const newPhone = {...phone};
        if(!/^1[3|4|5|7|8][0-9]{9}$/.test(newPhone.value)){
            newPhone.valid = false;
            newPhone.error = "请输入正确的手机号码";
        }
        setPhone(newPhone);
    }
    const handleSubmit = () => {
        validateUsername()
        validatePassword()
        validateRepassword()
        validatePhone()

        const formData = [username,password,phone];
        for (let i in formData){
            if(formData[i].value.length === 0)
                return;
        }

        if(username.valid && password.valid && repassword.valid && phone.valid){
            axios.post('/api/user/regist',{
                Userid : username.value,
                Password : password.value,
                Phone : phone.value,
            })
            .then(function(response){
                if(response.status === 200){
                    const token = response.data.userToken;
                    localStorage.setItem("token", token);
                    setAuthToken(token);
                    handleGetUserinfo();
                    setTimeout(()=>props.handleClose(),1500);
                    props.handleShowNotice("registSuccess");
                    setState("ok");
                }
            })
            setState("submit");
        } 
    }
    const checkUsername = () => {
        axios.get('/api/user/checkUsername?username='+username.value)
        .then(function(response){
            const newUsername = {...username};
            if(response.data === ""){
                newUsername.valid = true;
                newUsername.error = "可以使用的用户名";
            } else{
                newUsername.valid = false;
                newUsername.error = "该用户名已被注册";
            }
            setUsername(newUsername)
        })
    }

    const form = 
        <form autoComplete='off' noValidate>
            <Typography variant="subtitle1">
                输入下列基本信息以创建一个新用户
            </Typography>
            <TextField label="用户名" name="username" error={!username.valid} value={username.value}
                    inputProps={{'maxLength':'32'}} onChange={handleChangeValue} onBlur={validateUsername} 
                    required variant='outlined' margin="dense" fullWidth helperText={username.error} />
            <TextField label="密码" name="password" error={password.error.length>0} value={password.value}
                    inputProps={{'maxLength':'48'}} onChange={handleChangeValue} onBlur={validatePassword}
                    required variant='outlined' type="password" margin="dense" fullWidth helperText={password.error}/>
            <TextField label="确认密码" name="repassword" error={repassword.error.length>0} value={repassword.value}
                    required variant='outlined' onChange={handleChangeValue} onBlur={validateRepassword}
                    type="password" margin="dense" fullWidth helperText={repassword.error}/>
            <TextField label="手机号码" name="phone" error={phone.error.length>0} value={phone.value} required 
                    onChange={handleChangeValue} onBlur={validatePhone} 
                    variant='outlined' margin="dense" fullWidth helperText={phone.error}/>
            <Button color="primary" variant="contained" fullWidth style={{ marginTop: 16 }} onClick={handleSubmit}>
                提交注册信息
            </Button>
        </form>;
    const success = 
        <Typography variant="h4">
            注册成功
        </Typography>
    

    return (
        <div className={classes.container}>
            <div className={props.width !== 'xs' ? classes.div:null}>
            <Paper elevation={3} className={useClassName}>
                <Container style={{ width: '80%' }}>
                    <Typography variant="h5">
                        博客用户注册
                    </Typography>
                    {state === 'ok' ? success : form}
                </Container>
                <Backdrop className={classes.backdrop} open={state === "submit"}>
                    <div>
                        <Typography variant="body1" >
                            正在注册...
                        </Typography>
                        <CircularProgress color="inherit" className={classes.progress} />
                    </div>
                </Backdrop>
            </Paper>
            </div>
        </div>
    )
}