import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import PropTypes from "prop-types";

function format(item){
    if (item < 10) {
        item = "0" + item;
    }
    return item;
}

const formatTime = (time) => {
    return format(time.getHours()) + ":" + format(time.getMinutes()) + ":" + format(time.getSeconds());
};

const useStyles = makeStyles({
    root: {
        minWidth: 275,
        maxWidth: 300
    },
    title: {
        fontSize: 14,
    },
    actionbar: {
        display: 'flex',
        alignItems: 'baseline',
        justifyContent: 'space-between',
        paddingLeft: 10,
        paddingRight: 10,
        width: '100%'
    },
    link: {
        textDecoration: 'none',
    }
});

export default function ArticleCard(props) {
    const classes = useStyles();
    const { contentid } = props;
    const lovesNum = props.lovesNum;
    const commentsNum = props.commentsNum;
    const theme = useTheme();
    const time = [];
    if (!useMediaQuery(theme.breakpoints.down('xs'))) {
        time.push(
            <Typography key={props.contentid} variant='subtitle2' color="textSecondary">
                发布于 {formatTime(new Date(props.time))}
            </Typography>
        )
    }
    return (
        <Card className={classes.root}>
            <CardContent>
                {time}
                <Typography variant="h5" component="h2">
                    {props.title}
                </Typography>
                <Typography color="textSecondary">
                    文章版块：{props.group}
                </Typography>
            </CardContent>
            <CardActions>
                <div className={classes.actionbar}>
                    <Typography variant="body2">
                        评论：{commentsNum} 喜欢：{lovesNum}
                    </Typography>
                    <Link to={"/article/read/" + props.contentid} className={classes.link}>
                        <Button size="small">点击查看</Button>
                    </Link>
                </div>
            </CardActions>
        </Card>
    );
}

ArticleCard.propTypes = {
    commentsNum: PropTypes.number,
    lovesNum: PropTypes.number,
}

ArticleCard.defaultProps = {
    commentsNum: "-",
    lovesNum: "-",
}
