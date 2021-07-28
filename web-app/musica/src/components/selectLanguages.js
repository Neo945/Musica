import {Container,Paper} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const language = [
    'English',
    'Hindi',
    'Marathi',
    'Spanish',
]
const useStyles = makeStyles((theme) => ({
    paper: {
      height: 140,
      width: '100%',
      margin: theme.spacing(1),
    },
    flexCenter:{
        display:'flex',justifyContent:'center', alignItems:'center'
    }
  }));
export default function LanguageSelect(params) {
    const classes = useStyles();
    return (
        <Container className={classes.flexCenter} style={{padding: 0,flexDirection:'column', height:'100vh'}}>
            {language.map((ele,i)=><Paper key={i} className={classes.flexCenter + " " + classes.paper}>{ele}</Paper>)}
        </Container>
    );
}