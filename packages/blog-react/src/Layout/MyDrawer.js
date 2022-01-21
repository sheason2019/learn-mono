import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { ButtonAppBar } from './ButtonAppBar';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import { Link } from 'react-router-dom';


const drawerStyle = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    width: 240,
  },
  drawerPaper: {
    width: 240,
  },
  link: {
    textDecoration: 'none',
    color: theme.palette.text.primary
  }
}));

export default function MyDrawer() {
  const classes = drawerStyle();
  const [state, setState] = React.useState({
    left: false,
  });

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, left: open });
  }

  return (
    <div className={classes.root}>
      <ButtonAppBar onClick={toggleDrawer(true)} />
      <Drawer anchor={"left"}
        className={classes.drawer}
        classes={{
          paper: classes.drawerPaper,
        }}
        open={state["left"]}
        onClose={toggleDrawer(false)}>
        <div>
          <List>
            <Link to='/index' className={classes.link} onClick={toggleDrawer(false)}>
              <ListItem button key={"首页"}>
                <ListItemIcon><InboxIcon /></ListItemIcon>
                <ListItemText primary={"首页"} />
              </ListItem>
            </Link>
            <Link to='/doc' className={classes.link} onClick={toggleDrawer(false)}>
              <ListItem button key={"文档"}>
                <ListItemIcon><InboxIcon /></ListItemIcon>
                <ListItemText primary={"文档"} />
              </ListItem>
            </Link>
            <Link to='/article/all' className={classes.link} onClick={toggleDrawer(false)}>
              <ListItem button key={"文章"}>
                <ListItemIcon><InboxIcon /></ListItemIcon>
                <ListItemText primary={"文章"} />
              </ListItem>
            </Link>
            <Link to='/articlegroup' className={classes.link} onClick={toggleDrawer(false)}>
              <ListItem button key={"文章分组"}>
                <ListItemIcon><InboxIcon /></ListItemIcon>
                <ListItemText primary={"文章分组"} />
              </ListItem>
            </Link>
          </List>
        </div>
      </Drawer>
    </div>
  )

}