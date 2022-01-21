import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    toc1: {
        paddingLeft: theme.spacing(0),
    },
    toc2: {
        paddingLeft: theme.spacing(1),
    },
    toc3: {
        paddingLeft: theme.spacing(2),
    },
    root: {
        '& span': {
            display: 'block',
            marginBottom: theme.spacing(1)
        },
        '& span:hover': {
            background: 'whitesmoke',
            cursor: 'pointer'
        },
    }

}));

const handleGetToc = (id) => {
    const div = document.getElementById(id);
    const title = div.querySelectorAll("h1, h2, h3");
    return title;
}

const handleScrollTo = (dom) => {
    const headerHeight = document.getElementById("header").clientHeight;
    window.scrollTo(0, dom.offsetTop - headerHeight);
}

export default function TOC(props) {
    const classes = useStyles();

    const [tocDom, setTocDom] = React.useState(handleGetToc("markdown-body"));
    const tocArray = [];
    const handleClick = (dom) => (e) => {
        if (dom === "top") {
            window.scrollTo(0, 0);
        } else {
            handleScrollTo(dom);
        }
        props.handleClose();
    }
    tocArray.push(
        <Typography
            onClick={handleClick("top")}
            variant="button"
            key={-1}
        >
            回到顶部
        </Typography>
    );

    for (let i = 0; i < tocDom.length; i++){
        const tag = parseInt(tocDom[i].tagName.charAt(1));
        tocArray.push(
            <Typography
                className={classes["toc" + tag]}
                onClick={handleClick(tocDom[i])}
                variant="button"
                key={i}
            >
                {tocDom[i].innerHTML}
            </Typography>
        )
    }
    return (
        <div className={classes.root}>
            {tocArray}
        </div>
    )
}