import Fab from '@material-ui/core/Fab';
import SearchIcon from '@material-ui/icons/Search';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import SearchDialog from './SearchDialog';

const useStyle = makeStyles((theme) => ({
    root: {
        position: 'fixed',
        left: 0,
        right: 0,
        bottom: 0,
        textAlign: 'right'
    },
    fab: {
        position: 'relative',
        right: 30,
        bottom: 30
    }
}))

export default function TimeFlowFab(props) {
    const [open, setOpen] = React.useState(false);

    const classes = useStyle()
    const handleClickFab = () => {
        setOpen(true);
    }
    const handleSearch = (keyword) => {
        props.handleSearch(keyword);
    }
    const handleClose = () => {
        setOpen(false);
    }
    return (
        <div className={`mui-fixed ${classes.root}`}>
            <Fab color="primary" aria-label="search" className={`mui-fiexed ${classes.fab}`} onClick={handleClickFab}>
                <SearchIcon />
            </Fab>
            <SearchDialog onClose={handleClose} handleSearch={handleSearch} open={ open } />
        </div>
    )
}