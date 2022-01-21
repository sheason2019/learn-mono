import {Snackbar } from '@material-ui/core'; 
import Alert from '../component/Alert';
import {makeStyles} from '@material-ui/core/styles';

const useStyle = makeStyles((theme)=>({
    snackbar : {
        [theme.breakpoints.down('xs')] : {
            bottom : 45
        }
    }
}))

export default function NotiSnackBar(props){
    const classes = useStyle();

    const alert = {
        loginFail : 
        <Alert onClose={props.handleClose} severity="error">
            登录失败，请检查您的用户名和密码！
        </Alert>,
        loginSuccess :
        <Alert onClose={props.handleClose} severity="success">
            登陆成功，即将关闭登录页面...
        </Alert>,
        registSuccess :
        <Alert onClose={props.handleClose} severity="success">
            注册成功，即将关闭登录页面...
        </Alert>,
    }

    return(
        <Snackbar open={props.open} className={classes.snackbar} autoHideDuration={6000} onClose={props.handleClose}>
            {eval("alert."+props.type) }
        </Snackbar>
    )
}