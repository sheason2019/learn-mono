import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles } from '@material-ui/core/styles';
import LoginButton from '../login/LoginButton';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }));

export function ButtonAppBar(props) {
    const classes = useStyles();
  
    return (
      <div className={classes.root} id="header">
        <Toolbar />
        <AppBar position="fixed">
          <Toolbar>
            <IconButton onClick={props.onClick} edge="start"
              className={classes.menuButton} color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Sheason的博客
            </Typography>
            <LoginButton />
          </Toolbar>
        </AppBar>      
      </div>
    );
  }