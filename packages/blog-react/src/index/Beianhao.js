import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "0 2rem",
    display: "flex",
    justifyContent: "center",
  }
}))

export default function Beianhao() {
  const classes = useStyles();

  return (
    <div className={classes.root} id="footer">
      <span>网站备案号：</span>
      <a href="https://beian.miit.gov.cn/" target="_blank">鄂ICP备2021009658号-1</a>
    </div>
  )
}