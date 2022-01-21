import { CssBaseline } from '@material-ui/core';
import { SpacingGrid } from './SpacingGrid';
import IndexContext from './IndexContext';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Beianhao from "./Beianhao";
import React from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    background: "whitesmoke",
  },
}));

export default function Index() {
  const classes = useStyles();
  const [minHeight, setMinHeight] = React.useState("");
  React.useEffect(()=>{
    const headerHeight = document.getElementById("header").clientHeight;
    const footerHeight = document.getElementById("footer").clientHeight;
    const minHeight = `calc(100vh - ${headerHeight}px - ${footerHeight}px)`;
    setMinHeight(minHeight);
  },[])

  return (
    <CssBaseline className={classes.root}>
      <Container component="main" className={classes.container} style={{ minHeight: minHeight }}>
        <SpacingGrid />
        <IndexContext />
      </Container>
      <Beianhao />
    </CssBaseline>
  )
}