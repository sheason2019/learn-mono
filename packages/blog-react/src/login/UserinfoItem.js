import {Grid} from '@material-ui/core';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import {makeStyles } from '@material-ui/core/styles';

const useStyle = makeStyles((theme) => ({
    userinfo : {
        display : 'flex',
        alignItems : 'center',        
        paddingTop : theme.spacing(1),
        paddingBottom : theme.spacing(1),
        paddingLeft : theme.spacing(2),
        paddingRight : theme.spacing(2),
        '&:hover' : {
            backgroundColor : 'whitesmoke',
            cursor : 'pointer'
        },
    },
    userinfoContent : {
        flexGrow : 1,
        paddingLeft : theme.spacing(1),
    },
}))

export default function UserinfoItem(props) {
    const classes = useStyle();
    return (
        <Grid container justify="center">
            <Grid item xs={12}>
                <div className={classes.userinfo} onClick={props.onClick}>
                        {props.icon}
                    <div className={classes.userinfoContent}>
                        {props.children}
                    </div>
                    <ChevronRightIcon />
                </div>
            </Grid>
        </Grid>
    )
}