import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import Slide from '@material-ui/core/Slide';
import { Container, MenuItem, Paper, TextField } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import PopFab from './PopFab';
import {store} from '../redux/store';
import axios from 'axios';
import { handleGetUserinfo } from '../action/handleGetUserinfo';

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  infoRow: {
    backgroundColor: '#fff',
    width: '100%',
    height: 48
  },
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
  container: {
    flex : '1 1 0',
    backgroundColor: 'whitesmoke'
  },
  griditem: {
    height: '100%',
    maxWidth: 450,
  },
  formContainer: {
    paddingTop: theme.spacing(2),
  },
  fabDiv : {
    position : 'fixed',
    bottom : theme.spacing(2),
    right : theme.spacing(2),
  }
}));

const currencies = [
  {
    value : 1,
    label : '男'
  },
  {
    value : 2,
    label : '女',
  },
  {
    value : -1,
    label : '保密'
  }
  
]

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

const completeDate = (value) => {
  return value < 10 ? '0'+value:value;
}


export default function FullScreenDialog(props) {
  const classes = useStyles();
  const [isEdit,setIsEidt] = React.useState(false);
  const [userinfo,setUserinfo] = React.useState({});

  const handleBeginEdit = () => {
    setIsEidt(true);
  }
  const handleCancel = () => {
    setIsEidt(false);
    handleInitUserinfo();
  }
  const handleSubmit = () => {
    axios.post("/api/user/setuserinfo" , {
      Username : userinfo.username,
      Sex : userinfo.sex,
      Birthday : new Date(userinfo.birthday || '2000/01/01').toISOString()
    })
    .then(()=>{
      setIsEidt(false);
      handleGetUserinfo();
    })
    .catch(()=>{
      console.log("fail");
    })
    
  }
  const handleInitUserinfo = () => {
    setUserinfo(store.getState().userinfo);
  }
  React.useEffect(()=>{
    handleInitUserinfo()
  },[])
  const handleChange = (name) => (event) => {
    const temp = {...userinfo};
    temp[name] = event.target.value;
    setUserinfo(temp);
  }

  const EditButton = <Button autoFocus color="inherit" onClick={handleBeginEdit}>编辑</Button>;
  const CancelButton = <Button autoFocus color="inherit" onClick={handleCancel}>取消</Button>;

  const time = new Date(userinfo.birthday);
  let timeStr = null;
  if(!!time){
    timeStr = time.getFullYear()+'-'+completeDate((1+time.getMonth()))+'-'+completeDate(time.getDate());
    console.log(timeStr)
  }
  
  return (
    <div>
      <Dialog fullScreen className={classes.root} open={props.open} onClose={props.handleClose} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={props.handleClose} aria-label="close">
              <ArrowBackIosIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              详细资料
            </Typography>
            {isEdit ? CancelButton : EditButton}
          </Toolbar>
        </AppBar>

        <Grid container justify='center' className={classes.container}>
          <Grid item xs={12} sm={6} lg={4} className={classes.griditem}>
            <Paper elevation={3} className={classes.griditem}>
              <Container className={classes.formContainer}>
                <FormTextField value={userinfo.username} onChange={handleChange('username')} readOnly={!isEdit} label='昵称' />
                <FormTextField value={userinfo.sex || ''} onChange={handleChange('sex')} select readOnly={!isEdit} label='性别' >
                  {currencies.map((option) => (
                    <MenuItem key={option.key} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </FormTextField>
                <FormTextField value={timeStr ||'2000-01-01'} onChange={handleChange('birthday')} type='date' readOnly={!isEdit} label='出生日期' />
                { isEdit ? null :
                  <Typography variant='body2'>
                    Tips : 点击右上角的编辑按钮以进入编辑状态
                  </Typography>
                }
              </Container>
            </Paper>
          </Grid>
        </Grid>
        <Slide in={isEdit} direction='left' mountOnEnter unmountOnExit>
          <div className={classes.fabDiv}>
            <PopFab handleSubmit={handleSubmit}/>
          </div>
        </Slide>
      </Dialog>
    </div>
  );
}

const textfieldStyles = makeStyles((theme)=>({
  textfiled : {
    marginBottom :  props => props ? theme.spacing(2) : theme.spacing(3),
    background : props => props ? 'whitesmoke' : '#fff',
    transition : '0.5s'
  }
}))

function FormTextField(props){
  const classes = textfieldStyles(props.readOnly);
  return(
    <TextField 
      className={classes.textfiled} 
      InputProps={{readOnly : props.readOnly}}
      value={props.value}
      onChange={props.onChange}
      variant='outlined' size='small' label={props.label} fullWidth
      {...props}
      >
        {props.children}
      </TextField>
  )
}