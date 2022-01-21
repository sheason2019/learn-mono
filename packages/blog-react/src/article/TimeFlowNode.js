import TimelineContent from '../component/TimelineContent';
import ArticleCard from "./ArticleCard";
import TimelineNode from '../component/TimelineNode';
import Grid from '@material-ui/core/Grid';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import formatTime from '../action/formatTime';


export default function TimeFlowNode(props) {
    const theme = useTheme();
    const showDetailTime = useMediaQuery(theme.breakpoints.down('xs'))
    const timeStr = formatTime(new Date(props.articleArray[0].Time), showDetailTime);
    return (
        <Grid container>
            <Grid item xs={12}>
                <TimelineNode variant="outlined">
                    {timeStr}
                </TimelineNode>
            </Grid>
            <Grid item xs={12}>
                <TimelineContent>
                    <Grid container spacing={4}>
                        {props.articleArray.map((article) => (
                            <ListCard article={article} key={article.Contentid} />
                        ))}
                    </Grid>
                </TimelineContent>
            </Grid>
        </Grid>
    )
}

function ListCard(props) {
    const { article } = props;
    return (
        <Grid item xs={12} sm={4} lg={3}>
            <ArticleCard
                title={article.Title}
                group={article.Grouptitle}
                contentid={article.Contentid}
                time={article.Time}
                commentsNum={article.CommentsNum}
                lovesNum={article.LovesNum}
            />
        </Grid>
    )
}