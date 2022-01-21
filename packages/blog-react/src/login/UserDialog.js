import {
  AppBar,
  Paper,
  Dialog,
  Grid,
  IconButton,
  LinearProgress,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CloseIcon from "@material-ui/icons/Close";
import React from "react";
import Slide from "@material-ui/core/Slide";
import PersonIcon from "@material-ui/icons/Person";
import CreateIcon from "@material-ui/icons/Create";
import HistoryIcon from "@material-ui/icons/History";
import SettingsIcon from "@material-ui/icons/Settings";
import UserinfoItem from "./UserinfoItem";
import UserinfoDialog from "./UserinfoDialog";
import LogoutButton from "./LogoutButton";
import AvatarDialog from './AvatarDialog';
import {store} from '../redux/store';

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  avatorContainer: {
    marginTop: theme.spacing(2),
    textAlign: "center",
  },
  textCenter: {
    textAlign: "center",
  },
  expProgress: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  root: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
  },
  container: {
    flexGrow: 1,
    backgroundColor: "whitesmoke",
  },
  actionPanel: {
    flexGrow: 1,
    marginTop: theme.spacing(2),
  },
  fullWidth: {
    width: "100%",
  },
  slide: {
    position: "fixed",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  griditem: {
    top: 0,
    bottom : 0,
    display: "absolute",
    
  },
  content: {
    display: "flex",
    flexGrow: 1,
    flexDirection: "column",
    maxWidth: 450,
    height: "100%",
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function LoginDialog(props) {
  const classes = useStyles();

  const [select, setSelect] = React.useState(null);
  const [secondaryDialogCache, setSecondaryDialogCache] = React.useState(null);
  const [userinfo, setUserinfo] = React.useState({});

  const handleClick = (option) => (event) => {
    setSelect(option);
    setSecondaryDialogCache(option);
  };
  const handleClose = () => {
    setSelect(null);
  };
  const handleInitUserinfo = () => {
    setUserinfo(store.getState().userinfo);
  }
  React.useEffect(()=>{
    handleInitUserinfo()
  },[])

  const SlideOption = {
    userinfo: (
      <UserinfoDialog open={select !== null} handleClose={handleClose} />
    ),
  };

  return (
    <div>
      <Dialog
        fullScreen
        className={classes.root}
        open={props.open}
        onClose={props.handleClose}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={props.handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              用户信息
            </Typography>
          </Toolbar>
        </AppBar>

        <Grid container justify="center" className={classes.container}>
          <Grid item xs={12} sm={6} lg={4} className={classes.griditem}>
            <Paper elevation={3} className={`${classes.content}`}>
              <Grid
                container
                justify="center"
                classes={classes.avatorcontainer}
              >
                <Grid item xs={12}>
                  <div className={classes.avatorContainer}>
                    <AvatarDialog userid={userinfo.userid}/>
                    <Typography variant="h5">{userinfo.username}</Typography>
                  </div>
                </Grid>
              </Grid>
              <Grid container justify="center" className={classes.expcontainer}>
                <Grid item container xs={12}>
                  <Grid item xs={2} className={classes.textCenter}>
                    Lv.1
                  </Grid>
                  <Grid item xs={8} className={classes.expProgress}>
                    <LinearProgress variant="determinate" value={0} />
                  </Grid>
                  <Grid item xs={2} className={classes.textCenter}>
                    0/100
                  </Grid>
                </Grid>
              </Grid>
              <div className={classes.actionPanel}>
                <UserinfoItem
                  icon={<PersonIcon />}
                  onClick={handleClick("userinfo")}
                >
                  个人信息
                </UserinfoItem>
                <UserinfoItem icon={<CreateIcon />}>个性签名</UserinfoItem>
                <UserinfoItem icon={<HistoryIcon />}>操作历史</UserinfoItem>
                <UserinfoItem icon={<SettingsIcon />}>账户设置</UserinfoItem>
              </div>
              <LogoutButton />
            </Paper>
          </Grid>
        </Grid>
        <Slide direction="left" in={select !== null} mountOnEnter unmountOnExit>
          <div className={classes.slide}>
            {SlideOption[secondaryDialogCache]}
          </div>
        </Slide>
      </Dialog>
    </div>
  );
}
