import { Snackbar, Button, Container, TextField, Typography } from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import {useState , useEffect} from 'react';
import ReactMarkdown from 'react-markdown';
import gfm from "remark-gfm";
import 'github-markdown-css';
import DocFab from './DocFab';
import DocPreviewTip from './DocPreviewTip';
import SubmitDialog from './SubmitDialog';
import Alert from '../component/Alert';
import { withRouter } from 'react-router';

const useStyle = makeStyles((theme) => ({
    marginTop: {
        marginTop: theme.spacing(2),
    },
    w100 : {
        width: "100%",
    },
    container: {
        backgroundColor: "#FFF",
        paddingBottom: theme.spacing(2),
        paddingTop: theme.spacing(1),
        marginTop:theme.spacing(1),
    },
    previewTitle:{
        marginTop: theme.spacing(2),
        paddingBottom: theme.spacing(1)
    },
    snackbar : {
        [theme.breakpoints.down('xs')] : {
            bottom : 45
        }
    }
}))

function DocForm(props){
    const classes = useStyle();

    const [title,setTitle] = useState("");
    const [content,setContent] = useState("");
    const [display,setDisplay] = useState("write");

    const [dialogOpen,setDialogOpen] = useState(false);
    const [snackbarOpen,setSnackbarOpen] = useState(false);

    const [currencies,setCurrencies] = useState([]);
    const [currency,setCurrency] = useState("");
    const [newGroupname,setNewGroupname] = useState("")

    const handleSubmit = () => {
        console.log({
            Title : title,
            Content : content,
            Groupid : currency,
            Grouptitle : newGroupname,
        })
        axios.post('/api/article/newarticle',{
                Title : title,
                Content : content,
                Groupid : currency.toString(),
                Grouptitle : newGroupname,
            })
            .then((res)=>{
                if(res.status === 200){
                    alert(res.data.message);
                    props.history.push('/article');
                } else {
                    alert(res.data.message);
                }
            })
            .catch(()=>{console.log("提交失败")})
    }
    const handlePreview = (e) => {
        if(title.length === 0 || content.length === 0)
            setSnackbarOpen(true)
        else
            setDisplay('preview');
    }
    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    }
    const handleGetCurrencies = () => {
        axios.get("/api/article/getarticlegroup")
        .then((res)=>{
            if(res.status === 200){
                setCurrencies(res.data.data);
            }
        })
        .catch((err)=>{
            alert("服务器状态错误");
            console.log(err);
        })
    }
    useEffect(() => {
        handleGetCurrencies();
    },[]);

    if(display === 'write')
        return (
            <div>
            <Container>
                <Typography variant="h4" className={classes.marginTop} >
                    新的文章
                </Typography>
            </Container>
            <Container className={classes.container}>
            <form autoComplete='off'>
                <Grid container direction="row" justify='flex-end'>
                    <Grid item xs={12} className={classes.marginTop}>
                        <TextField label='文章标题' value={title} onChange={(e)=>setTitle(e.target.value)} variant="outlined" className={classes.w100}/>
                    </Grid>
                    <Grid item xs={12} className={classes.marginTop}>
                        <TextField label='正文内容' value={content} onChange={(e)=>setContent(e.target.value)} multiline variant='outlined'
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
    if(display === 'preview')
        return(
            <div> 
                <Container className={classes.container}>
                    <Typography variant="h4">
                        {title}
                    </Typography>
                    <DocPreviewTip />
                    <Container className={classes.marginTop}>
                        <ReactMarkdown remarkPlugins={[gfm]} className='markdown-body'>
                            {content}
                        </ReactMarkdown>
                    </Container>
                </Container>
                <DocFab setDisplay={setDisplay} setDialogOpen={setDialogOpen}/>
                <SubmitDialog  handleSubmit={handleSubmit} newGroupname={newGroupname} setNewGroupname={setNewGroupname} currencies={currencies} currency={currency} setCurrency={setCurrency} open={dialogOpen} setOpen={setDialogOpen}/>
            </div>
        )
}

export default withRouter(DocForm);