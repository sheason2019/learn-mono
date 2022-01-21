import {makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import { CardActionArea, CardMedia, CardContent, Typography } from '@material-ui/core';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
    media: {
        height: 140.
    },
});

export default function MediaCard() {
    const classes = useStyles();

    return(
        <Card>
            <CardActionArea>
                <CardMedia className={classes.media} src={"#"}/>
                <CardContent>
                    <Typography gutterBottom variant='h5' component='h2'>
                        Lizard
                    </Typography>
                    <Typography variant='body2' color='textSecondary' component='p'>
                        Lizards are a widespread group of squamate reptiles.
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size='small' color='primary'>
                    share
                </Button>
                <Button size='small' color='primary'>
                    Learn More
                </Button>
            </CardActions>
        </Card>
    )
}