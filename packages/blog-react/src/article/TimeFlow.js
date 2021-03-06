import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Typography, Grid, Button } from "@material-ui/core";
import TimelineNode from '../component/TimelineNode';
import TimeFlowNode from "./TimeFlowNode";
import axios from "axios";
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import TimeFlowFab from "./TimeFlowFab";
import { useParams } from "react-router-dom";
import formatTime from '../action/formatTime';

const useStyles = makeStyles((theme, props) => ({
    gridcontainer: {
        marginTop: theme.spacing(2),
    },
    title : {
        display : 'flex',
        alignItems : 'center'
    },
    footer: {
        height : 45,
    }
}));

const initArticleNodes_xs = (articleNodes, articles) => {
    for (let i = 0; i < articles.length; i++) {
        const articleArray = [];
        articleArray.push(articles[i]);
        articleNodes.push(
            <TimeFlowNode key={i} articleArray={articleArray} />
        );
    }
}
const initArticleNodes = (articleNodes, articles) => {
    let i = 0;
    while (i < articles.length) {
        const articleArray = [];
        let dateCache = null;
        while (i < articles.length) {
            const time = new Date(articles[i].Time);
            if (dateCache === null) {
                dateCache = formatTime(time);
                articleArray.push(articles[i++]);
            } else if (formatTime(new Date(articles[i].Time)) === dateCache) {
                articleArray.push(articles[i++]);
            } else {
                break;
            }
        }
        articleNodes.push(
            <TimeFlowNode key={i} articleArray={articleArray} />
        );
    }
}

export default function TimeFlow(props) {
    const classes = useStyles(props);
    const [articles, setArticles] = React.useState([]);
    const [revers, setRevers] = React.useState(false);
    const [title, setTitle] = React.useState("?????????????????????...");
    const [useKeyword, setUseKeyword] = React.useState(null);
    const { groupid } = useParams();
    
    const getArticle = (groupid, keyword = "") => {
        if (keyword !== useKeyword) {
            axios.get(`/api/article/getarticles/${groupid}?keyword=${keyword}`).
                then(res => {
                    //????????????????????????state
                    const result = res.data.data;
                    setArticles(result);
                    setUseKeyword(keyword);
                });
        }
    }
    React.useEffect(()=>{
        if(articles.length === 0){
            return;
        }
        //???state???????????????????????????articleid????????????
        const indexTemp = {};
        for(let i=0;i<articles.length;i++){
            indexTemp[articles[i].Articleid] = i;
        }
        //??????ID??????
        const articleids = articles.map(i=>i.Articleid);
        //??????????????????
        axios.get("/api/article/commentsnum",{
            params: {
                articleids: articleids,
            },
        }).then(res=>{
            const result = res.data.commentsNum;
            const articlesTemp = [...articles];
            for(let i=0;i<result.length;i++){
                const articleid = result[i].Key;
                articlesTemp[indexTemp[articleid]].CommentsNum = result[i].Count;
            }
            setArticles(articlesTemp);
        });
        //??????????????????
        axios.get("/api/article/articleloves",{
            params: {
                articleids: articleids,
            },
        }).then(res=>{
            const result = res.data.love;
            const articlesTemp = [...articles];
            for(let i=0;i<result.length;i++){
                const articleid = result[i].Key;
                articlesTemp[indexTemp[articleid]].LovesNum = result[i].Count;
            }
            setArticles(articlesTemp);
        });
    },[articles.length])
    const getArticleGroup = () => {
        axios.get("/api/article/getarticlegroup/" + groupid)
            .then(res => {
                setTitle(res.data.data.Grouptitle || "??????????????????");
            }).catch(err => {
                console.error(err);
        })
    }
    React.useEffect(() => {
        getArticle(groupid);
        getArticleGroup();
    }, []);
    const reversArticle = () => {
        const tempArr = articles;
        tempArr.reverse();
        setArticles(tempArr);
        setRevers(!revers);
    }

    const articleNodes = [];

    const theme = useTheme();
    if (useMediaQuery(theme.breakpoints.down('xs'))) {
        initArticleNodes_xs(articleNodes, articles);
    } else {
        initArticleNodes(articleNodes, articles);
    }
    const handleSearch = (keyword) => {
        getArticle(groupid, keyword);
    }
    let subTitle = "";
    if (useKeyword !== "") {
        subTitle += " - ?????????" + useKeyword;
    }

    return (
        <Container>
            <Grid container className={classes.gridcontainer}>
                <Grid item xs={12}>
                    <div className={classes.title}>
                        <Typography variant="h4">
                            {title}{subTitle}
                        </Typography>
                    </div>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="button">
                        ???????????????
                    </Typography>
                    <Button onClick={reversArticle}>
                        {
                            revers ? "????????????" : "????????????"
                        }??????????????????
                    </Button>
                </Grid>
                {articleNodes}
                <Grid item xs={12}>
                    <TimelineNode>
                        END
                    </TimelineNode>
                </Grid>
            </Grid>
            <TimeFlowFab
                handleSearch={handleSearch}
                reversArticle={reversArticle}
                revers={revers} />
            <div className={classes.footer} />
        </Container>
    );
}
