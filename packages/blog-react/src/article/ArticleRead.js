import { Container, Typography } from "@material-ui/core";
import ArticleReadBottomBar from './ArticleReadBottomBar';
import { makeStyles } from "@material-ui/core/styles"
import axios from "axios";
import React from "react";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import 'github-markdown-css';
import ArticleReadFooter from "./ArticleReadFooter";
import formatTime from "../action/formatTime";
import { useParams } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    topBar: {
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
        borderBottom: '1px solid lightgray',
        display: 'flex',
        alignItems: 'center',
    },
    backbutton: {
        borderRight: '1px solid lightgray',
        marginRight: theme.spacing(2)
    },
    title: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1)
    },
    time: {
        color: theme.palette.text.secondary
    },
}))

export default function ArticleRead(props) {
    const classes = useStyles();

    const [article, setArticle] = React.useState({});
    const { contentid } = useParams();

    const handleGetArticle = () => {
        axios.get("/api/article/getarticle/" + contentid)
            .then(res => {
                setArticle(res.data.data);
            })
    }

    React.useEffect(() => {
        handleGetArticle();
    }, [contentid]);

    const timeStr = formatTime(new Date(article.Time), true);

    return (
        <div className={classes.root}>
            <Container className={classes.container}>
                <Typography variant='h4' className={classes.title}>
                    {article.Title || "文章标题"}
                </Typography>
                <Typography variant='subtitle1' className={classes.time}>
                    更新时间：{timeStr}
                </Typography>
                <div id="markdown-body">
                    <ReactMarkdown remarkPlugins={[gfm]} className='markdown-body'>
                        {article.Content || "正文加载中..."}
                    </ReactMarkdown>
                </div>
                <ArticleReadFooter />
                <ArticleReadBottomBar />
            </Container>
        </div>
    )
}
