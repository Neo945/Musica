import {Container,Paper, Button} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ButtonBase from '@material-ui/core/ButtonBase';
import {useState} from 'react'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

const language = [
    'English',
    'Hindi',
    'Marathi',
    'Spanish',
]
const useStyles = makeStyles((theme) => ({
    ripple:{
      height: '25%',
      width: '100%',
      margin: theme.spacing(1),
      overflow:'hidden',
      borderRadius: '10px'
},
    paper: {
      height: '200px',
      width: '100%',
      color:'white',
      fontSize:'3em',
      fontFamily:"'Style Script', cursive",
      background: 'url(https://cdn.pixabay.com/photo/2018/01/14/23/12/nature-3082832__340.jpg) center / cover no-repeat',
      transition: 'all 0.5s ease',
    },
    flexCenter:{
        display:'flex',
        justifyContent:'center', 
        alignItems:'center'
    },
    zoom: {
        '&:hover':{
            transform: 'scale(1.05)',
          }
    },
    focused:{
        filter: "hue-rotate(270deg)",
        // filter: "blur(5px)",
        transform:'scale(1.3)'
    },
    button: {
        position: 'absolute',
        bottom: theme.spacing(4),
        right: theme.spacing(4),
        margin: theme.spacing(1),
        padding: theme.spacing(1),
        fontSize: '1em',
        width: '80px',
        height: '80px',
        borderRadius: '50%',
    }
}));

export default function LanguageSelect(params) {
    let [selected, setSelected] = useState([]);
    const classes = useStyles();
    return (
        <Container component="div" maxWidth="lg" style={{padding: 0}}>
            {language.map((ele,i)=>
                <ButtonBase
                onClick={() => {
                    if (selected.indexOf(i)<0) setSelected([i,...selected]);
                    else {
                        const list = [...selected];
                        list.splice(list.indexOf(i),1);
                        setSelected(list);
                    };
                }}
                key={i}
                className={classes.ripple}>
                    <Paper
                    className={classes.flexCenter + " " + classes.paper + ' ' + (selected.indexOf(i)>=0 ? classes.focused : classes.zoom)}>
                        {ele}
                    </Paper>
                </ButtonBase>
            )}
            <Button 
            aria-label="add" 
            color="inherit" 
            className={classes.button}
            endIcon={<ArrowForwardIcon />}
            size="large"
            >
                Next
            </Button>
        </Container>
    );
}