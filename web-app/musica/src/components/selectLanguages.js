import {Container,Paper} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ButtonBase from '@material-ui/core/ButtonBase';
import {useState} from 'react'


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
},
    paper: {
      height: '100%',
      width: '100%',
      color:'white',
      fontSize:'3em',
      fontFamily:"'Style Script', cursive",
    },
    flexCenter:{
        display:'flex',justifyContent:'center', alignItems:'center'
    }
  }));
export default function LanguageSelect(params) {
    let [selected, setSelected] = useState([]);
    const classes = useStyles();
    return (
        <Container component="div" maxWidth="lg" className={classes.flexCenter} style={{padding: 0,flexDirection:'column', height:'100vh'}}>
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
                        style={{
                            background:(selected.indexOf(i)>=0 ?  
                            "linear-gradient(0deg, rgba(2,173,231,0.5), rgba(2,173,231,0.5)), url(https://cdn.pixabay.com/photo/2018/01/14/23/12/nature-3082832__340.jpg) center / cover no-repeat" : 
                            "url(https://cdn.pixabay.com/photo/2018/01/14/23/12/nature-3082832__340.jpg) center / cover no-repeat"),
                        }}
                    className={classes.flexCenter + " " + classes.paper}>
                        {ele}
                    </Paper>
                </ButtonBase>
            )}
        </Container>
    );
}