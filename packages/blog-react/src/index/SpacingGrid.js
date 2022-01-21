import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import { Divider } from '@material-ui/core';

const GridStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    paddingTop: theme.spacing(1)
  },
  paperContent: {
    padding: theme.spacing(4),
    textAlign: 'center',
    color: 'whitesmoke',
    backgroundColor: theme.palette.info.light
  },
  control: {
    padding: theme.spacing(2),
  },
  typography: {
    textAlign: 'center',
    padding: theme.spacing(4),
  },
}));

export function SpacingGrid() {
  const classes = GridStyles();

  return (
    <>
      <Grid container className={classes.root} spacing={2}>
        <Grid item xs={12}>
          <Paper className={classes.paper} >
            <Typography variant="h5" className={classes.typography}>
              有什么想了解的吗？
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Paper className={classes.paperContent}>
            <Typography variant="h6">
              学习
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Paper className={classes.paperContent}>
            <Typography variant="h6">
              日志
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Paper className={classes.paperContent}>
            <Typography variant="h6">
              网站
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Paper className={classes.paperContent}>
            <Typography variant="h6">
              其他
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6" style={{ textAlign: 'center' }}>
            随便看看？继续往下滑动...
          </Typography>
        </Grid>
      </Grid>
      <Divider />
    </>
  )
}