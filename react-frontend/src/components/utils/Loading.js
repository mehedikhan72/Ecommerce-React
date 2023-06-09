import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));

export default function Loading() {
    const classes = useStyles();
    return (
        <div className="loading z-[10000]">
            <Backdrop
                className={classes.backdrop} open
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </div>
    );
}