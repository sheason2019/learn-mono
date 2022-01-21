import { Button, Menu, MenuItem } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import React from "react";
import DeleteDialog from './DeleteDialog';
import { useParams, useHistory } from 'react-router-dom';
import HistoryDialog from "./HistoryDialog";

const useStyle = makeStyles((theme) => ({
    button: {
        display: "flex",
        flexDirection: "column",
        width: "25%",
        "& p": {
            marginTop: 0,
            marginBottom: 0,
        },
        "& svg": {
            marginBottom: -theme.spacing(1),
        },
    },
    textCenter: {
        textAlign: 'center',
        minWidth: 240
    }
}));
export default function OptionButton(props) {
    const classes = useStyle();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const history = useHistory();
    const { contentid } = useParams();

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleChange = () => {
        history.push('/doc/' + contentid);
    }

    return (
        <>
            <Button className={classes.button} onClick={handleClick}>
                <div>
                    <MoreHorizIcon />
                    <p>更多</p>
                </div>
            </Button>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <HistoryDialog onClick={handleClose} />
                <MenuItem onClick={handleChange}>修改文章</MenuItem>
                <DeleteDialog onClick={ handleClose}/>
            </Menu>
        </>
    );
}
