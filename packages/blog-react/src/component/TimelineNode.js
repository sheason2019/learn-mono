import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme,props) => ({
    timeflowDotContainer : {
        display : 'flex',
        alignItems : 'center'
    },
    timeflowDot : {
        width : 10,
        height : 10,
        backgroundColor : props => props.variant==='outlined' ? null : theme.palette.primary.main,
        border : '1px solid #3f51b5',
        borderRadius: 5,
        marginRight : theme.spacing(1),
    },
}));

export default function TimelineNode(props){
    const variant = props.variant || 'containerd';
    const style = {variant : variant}
    const classes = useStyles(style);
    return(
        <div className={classes.timeflowDotContainer}>
            <div className={classes.timeflowDot} />
            {props.children}
        </div>  
    )
}