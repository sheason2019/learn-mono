import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme, props) => ({
    timeflowContentContainer: {
        display: 'flex',
        alignItems: 'strect',
    },
    timeflowSeperator: {
        display: 'box',
        width: 2,
        marginLeft: 4,
        marginRight: theme.spacing(2) + 4,
        backgroundColor: 'lightgray',
    },
    timeflowContent : {
        paddingTop : theme.spacing(0.5),
        paddingBottom : theme.spacing(1),
        flexGrow : 1
    }
}));

export default function TimelineContent(props) {
    const classes = useStyles(props);
    return (
        <div className={classes.timeflowContentContainer}>
            <div className={classes.timeflowSeperator} />
            <div className={classes.timeflowContent}>
                {props.children}
            </div>
        </div>
    )
}