import React from 'react';
import { DialogActions, DialogContent } from "@material-ui/core";
import { DialogContentText } from "@material-ui/core";
import { Dialog, DialogTitle, TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import PropTypes from 'prop-types';

const useStyle = makeStyles((theme) => ({
    dialogContent: {
        paddingBottom: theme.spacing(2)
    }
}))

export default function SearchDialog(props) {
    const classes = useStyle();
    const [keyword, setKeyword] = React.useState("");
    const handleSearch = () => {
        props.handleSearch(keyword);
        props.onClose();
    };

    return (
        <Dialog fullWidth onClose={props.onClose} open={props.open} aria-labelledby="search-dialog">
            <DialogTitle id="search-dialog-title">输入关键词搜索文章</DialogTitle>
            <DialogContent className={classes.dialogContent}>
                <DialogContentText>
                    目前仅支持文章标题搜索，空查询显示所有内容
                </DialogContentText>
                <TextField
                    variant="outlined"
                    label="文章标题"
                    value={keyword}
                    onChange={e => setKeyword(e.target.value)}
                    autoFocus
                    fullWidth
                />
            </DialogContent>
            <DialogActions>
                <Button color="primary" type="submit" onClick={handleSearch}>
                    搜索
                </Button>
            </DialogActions>
        </Dialog>
    )
}

SearchDialog.propTypes = {
    onClose: PropTypes.func,
    open: PropTypes.bool,
    handleSearch: PropTypes.func,
}
SearchDialog.defaultProps = {
    onClose: () => { },
    open: false,
    handleSearch: () => { },
}