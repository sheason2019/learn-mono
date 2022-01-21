import React from 'react';
import { makeStyles } from '@material-ui/core';
import { Typography,Container,Grid,Card,ButtonBase } from '@material-ui/core';
import axios from 'axios';
import { Link } from '@material-ui/icons';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
    root: {
        background: 'whitesmoke',
        paddingBottom: theme.spacing(2),
        height : '100%'
    },
    title: {
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1)
    },
    paper: {
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
        width:'100%',
        textAlign: 'center',
        '&:hover': {
            background: 'whitesmoke',
            cursor : 'pointer'
        }
    },
    buttonBase: {
        width: '100%'
    }
}))

export default function ArticleGroup(props) {
    const classes = useStyles();
    const [articleGroup, setArticleGroup] = React.useState([]);
    const history = useHistory();

    const handleGetArticleGroup = () => {
        axios.get("/api/article/getarticlegroup")
            .then(res => {
                if (res.status === 200) {
                    setArticleGroup(res.data.data);
            }
        })
    }
    React.useEffect(() => {
        handleGetArticleGroup()
    }, []);
    const handleOnClick = (groupid) => (event) => {
        history.push('/article/'+groupid)
    }

    const content = [];
    for (let i = 0; i < articleGroup.length;i++) {
        content.push(<ArticleGroupCard articleGroup={articleGroup[i]}/>);
    }

    return (
        <Container className={classes.root}>
            <Typography variant='h4' className={classes.title}>
                选择文章分组
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <ButtonBase className={classes.buttonBase} onClick={handleOnClick('all')}>
                        <Card elevation={2} className={classes.paper}>
                            <Typography variant='h5' >
                                查看全部文章
                            </Typography>
                            <Typography variant='body' >
                                文章： 喜欢：
                            </Typography>
                        </Card>
                    </ButtonBase>
                </Grid>
                {content}
            </Grid>
        </Container>
    )
}

function ArticleGroupCard(props) {
    const classes = useStyles();
    const history = useHistory();
    const handleOnClick = (groupid) => (event) => {
        history.push('/article/'+groupid)
    }
    return (
        <Grid item xs={12} sm={4} md={3}>
        <ButtonBase className={classes.buttonBase} onClick={handleOnClick(props.articleGroup.Groupid)}>
            <Card elevation={2} className={classes.paper}>
                <Typography variant='h5' >
                    {props.articleGroup.Grouptitle || "GroupTitle"}
                </Typography>
                <Typography variant='body' >
                    文章： 喜欢：
                </Typography>
            </Card>
        </ButtonBase>
    </Grid>
    )
}