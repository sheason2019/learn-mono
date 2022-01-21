import Grid from '@material-ui/core/Grid';
import MediaCard from './MediaCard';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root:{
        marginTop: theme.spacing(1),
    }
}));

export default function IndexContext(){
    const classes = useStyles();
    return (
        <>
            <Grid container spacing={2} className={classes.root} >
                <Grid item md={3} sm={6} xs={12}>
                    <MediaCard />
                </Grid>
                <Grid item md={3} sm={6} xs={12}>
                    <MediaCard />
                </Grid>
                <Grid item md={3} sm={6} xs={12}>
                    <MediaCard />
                </Grid>
                <Grid item md={3} sm={6} xs={12}>
                    <MediaCard />
                </Grid>
            </Grid>
        </>
    )
}