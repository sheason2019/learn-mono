import { Paper,TextField,Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const useStyle = makeStyles((theme) => ({
    root: {
        
    },
}));

export default function CommentInput(props) {
    const classes = useStyle();
    return (
        <Grid container className={classes.root}>
            <Grid item xs={12}>
                <TextField fullWidth variant="outlined" margin="dense" />
            </Grid>
        </Grid>
    )
}
