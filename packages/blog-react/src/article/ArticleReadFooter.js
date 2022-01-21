import {Grid , Button, Divider} from '@material-ui/core';
import {makeStyles} from "@material-ui/core/styles"

const useStyles = makeStyles((theme)=>({
    footer : {
        backgroundColor : theme.palette.action.hover,
        padding : theme.spacing(2),
        marginTop : 150,
        textAlign : 'center',
        display : 'flex',
        flexDirection : 'column',
        justifyContent : 'space-between'
    },
    hr : {
        backgroundColor : 'lightgray',
        height : 1,
        border : 'none'
    }

}))

export default function ArticleReadFooter(props){
    const classes = useStyles();

    return(
        <div className={classes.footer}>
                <Grid container>
                    <Grid item xs={4}>
                        <Button fullWidth>
                            上一篇
                        </Button>
                    </Grid>
                    <Grid item xs={4}>
                        <Button fullWidth>
                            文章组
                        </Button>
                    </Grid>
                    <Grid item xs={4}>
                        <Button fullWidth>
                            下一篇
                        </Button>
                    </Grid>
                </Grid>
            </div>
    )
}