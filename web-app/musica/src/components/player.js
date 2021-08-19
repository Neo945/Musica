import { Box, Button, makeStyles, Slider, withStyles } from "@material-ui/core";
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';

const useStyle = makeStyles(theme => {
    const br = '10px';
    return {
        back: {
            position: 'absolute',
            top: '10px',
            left: '10px',
            borderRadius: '50%',
            width: '70px',
            height: '70px',
        },
        boxback: {
            width: '100vw',
            height: '100vh',
        },
        audioBoxBorder: {
            width: '80%',
            height: '80%',
            // backdropFilter: 'blur(10px)',
            backgroundColor: 'white',
            borderRadius: br,
        },
        audioBox: {
            width: 'calc(100% - 2px)',
            height: 'calc(100% - 2px)',
            backgroundColor: theme.palette.background.default,
            borderRadius: br,
        },
    }
});
const CustomSlider = withStyles({
    root: {
        color: "#6f8eff",
        height: 3,
        padding: "13px 0",
    },
    track: {
        height: 4,
        borderRadius: 2,
    },
    thumb: {
        height: 20,
        width: 20,
        backgroundColor: "#fff",
        border: "1px solid currentColor",
        marginTop: -9,
        marginLeft: -11,
        boxShadow: "#ebebeb 0 2px 2px",
        "&:focus, &:hover, &$active": {
            boxShadow: "#ccc 0 2px 3px 1px",
        },
        color: "#fff",
    },
})(Slider);
const Player = (params) => (
    <Box display="flex" justifyContent="center" alignItems="center" className={params.classes.audioBoxBorder}>
        <Box className={params.classes.audioBox} display="flex" justifyContent="center" alignItems="center">
        <Box display="flex" justifyContent="center" alignItems="center" style={{width: '50%', height: '100%'}}>
            <CustomSlider/>
        </Box>
        <Box display="flex" justifyContent="center" alignItems="center" style={{width: '50%', height: '100%'}}>
        </Box>
        </Box>
    </Box>
);
export default function PlayerPage(params) {
    const classes = useStyle();
    return (
        <Box className={classes.boxback} display="flex" justifyContent="center" alignItems="center">
            <Button className={classes.back} >
                <KeyboardArrowDownIcon />
            </Button>
            <Player classes={classes}/>
        </Box>
    );
}