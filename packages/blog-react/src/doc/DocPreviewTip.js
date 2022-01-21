import HelpOutlineIcon from '@material-ui/icons/HelpOutline'
import Typography from '@material-ui/core/Typography';
import { Popover } from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles'
import React from 'react';

const useStyles = makeStyles((theme)=>({
    typography:{
        padding: theme.spacing(2),
    },
}))

export default function DocPreviewTip() {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const classes = useStyles();
    const open = Boolean(anchorEl);

    return (
        <div>
            <Typography variant='subtitle1' onClick={(e) => setAnchorEl(e.currentTarget)}>
                文章预览模式
                <HelpOutlineIcon fontSize='inherit' />
            </Typography>
            <Popover open={open} anchorEl={anchorEl} onClose={(e)=>setAnchorEl(null)}
                anchorOrigin={{vertical: 'bottom',horizontal: 'left'}}
                transformOrigin={{vertical:'top',horizontal:'left'}}>
                    <Typography className={classes.typography}>
                        预览并检查你的文章，然后使用右下角的按钮进行下一步操作
                    </Typography>
            </Popover>
        </div>
    )
}