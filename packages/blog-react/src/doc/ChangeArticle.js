import { Snackbar, Button, Container, TextField, Typography, Backdrop } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import 'github-markdown-css';
import DocFab from './DocFab';
import DocPreviewTip from './DocPreviewTip';
import ChangeArticleDialog from './ChangeArticleDialog';
import Alert from '../component/Alert';
import { withRouter } from 'react-router';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useHistory } from 'react-router-dom';

const useStyle = makeStyles((theme) => ({
    marginTop: {
        marginTop: theme.spacing(2),
    },
    w100: {
        width: "100%",
    },
    container: {
        backgroundColor: "#FFF",
        paddingBottom: theme.spacing(2),
        paddingTop: theme.spacing(1),
        marginTop: theme.spacing(1),
    },
    previewTitle: {
        marginTop: theme.spacing(2),
        paddingBottom: theme.spacing(1)
    },
    snackbar: {
        [theme.breakpoints.down('xs')]: {
            bottom: 45
        }
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}))

function ChangeArticle(props) {
    const classes = useStyle();

    const handleGetOldArticle = () => {
        setIsloading(true);
        axios.get("/api/article/getarticle/" + props.match.params.contentid)
            .then(res => {
                const article = res.data.data;
                setIsloading(false);
                setContent(article.Content);
                setTitle(article.Title);
            })
    }
    useEffect(() => {
        handleGetOldArticle();
    }, [])

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [display, setDisplay] = useState("write");

    const [dialogOpen, setDialogOpen] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    const [isloading, setIsloading] = useState(false);

    const history = useHistory();

    const handleSubmit = () => {
        const data = {
            Title: title,
            Content: content,
        };
        console.log(data)
        axios.post(`/api/article/updatearticle/${props.match.params.contentid}`, data)
            .then(res => {
                setDialogOpen(false);
                alert("修改成功，即将前往目录")
                history.push('/article');
            })
            .catch(err=>console.log(err))
    }
    const handlePreview = (e) => {
        if (title.length === 0 || content.length === 0)
            setSnackbarOpen(true)
        else
            setDisplay('preview');
    }
    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    }

    if (display === 'write')
        return (
            <div>
                <Backdrop className={classes.backdrop} open={isloading}>
                    <CircularProgress color="inherit" />
                </Backdrop>
                <Container>
                    <Typography variant="h4" className={classes.marginTop} >
                        修改文章
                    </Typography>
                </Container>
                <Container className={classes.container}>
                    <form autoComplete='off'>
                        <Grid container direction="row" justify='flex-end'>
                            <Grid item xs={12} className={classes.marginTop}>
                                <TextField label='文章标题' value={title} onChange={(e) => setTitle(e.target.value)} variant="outlined" className={classes.w100} />
                            </Grid>
                            <Grid item xs={12} className={classes.marginTop}>
                                <TextField label='正文内容' value={content} onChange={(e) => setContent(e.target.value)} multiline variant='outlined'
                                    className={classes.w100} rows={18} rowsMax={26} />
                            </Grid>
                            <Grid item xs={12} sm={2} className={classes.marginTop}>
                                <Button variant="contained" size="large" onClick={handlePreview} color="primary" className={classes.w100}>发布</Button>
                            </Grid>
                        </Grid>
                    </form>
                </Container>
                <Snackbar open={snackbarOpen} className={classes.snackbar} autoHideDuration={3000} onClose={handleCloseSnackbar}>
                    <Alert onClose={handleCloseSnackbar} severity="error">
                        文章的标题和内容不能为空，请检查您的输入
                </Alert>
                </Snackbar>
            </div>
        )
    if (display === 'preview')
        return (
            <div>
                <Container className={classes.container}>
                    <Typography variant="h4">
                        {title}
                    </Typography>
                    <DocPreviewTip />
                    <Container className={classes.marginTop}>
                        <ReactMarkdown className='markdown-body'>
                            {content}
                        </ReactMarkdown>
                    </Container>
                </Container>
                <DocFab setDisplay={setDisplay} setDialogOpen={setDialogOpen} />
                <ChangeArticleDialog handleSubmit={handleSubmit} open={dialogOpen} setOpen={setDialogOpen} />
            </div>
        )
}

export default withRouter(ChangeArticle);