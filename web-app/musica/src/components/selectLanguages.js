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
    //   "&:hover": {
    //     backgroundColor: "white"
    //   },
    //   "&:active": {
    //     backgroundColor: "white"
    //   }
},
    paper: {
      height: '100%',
      width: '100%',
    //   background:'linear-gradient(0deg, rgba(2,173,231,0.5), rgba(2,173,231,0.5)), url(https://cdn.pixabay.com/photo/2018/01/14/23/12/nature-3082832__340.jpg) no-repeat center',
    //   backgroundSize:'cover',
      color:'white',
      fontSize:'3em',
      fontFamily:"'Style Script', cursive",
    },
    flexCenter:{
        display:'flex',justifyContent:'center', alignItems:'center'
    }
  }));
export default function LanguageSelect(params) {
    let [Selected, setSelected] = useState([]);
    function setState(event){
        console.log(event.target)
        if (Selected.indexOf(event.target.key)<0) setSelected([event.target.key,...Selected]);
    }
    const classes = useStyles();
    return (
        <Container component="div" maxWidth="lg" className={classes.flexCenter} style={{padding: 0,flexDirection:'column', height:'100vh'}}>
            {language.map((ele,i)=>
                <ButtonBase
                onClick={setState}
                key={i} 
                className={classes.ripple}>
                    <Paper
                        style={{
                            background:(Selected.indexOf(i)>0 ?  "linear-gradient(0deg, rgba(2,173,231,0.5), rgba(2,173,231,0.5)), url(https://cdn.pixabay.com/photo/2018/01/14/23/12/nature-3082832__340.jpg) center / cover no-repeat"
                            : "url(https://cdn.pixabay.com/photo/2018/01/14/23/12/nature-3082832__340.jpg) center / cover no-repeat"),
                        }}
                    className={classes.flexCenter + " " + classes.paper}>
                        {ele}
                    </Paper>
                </ButtonBase>
            )}
        </Container>
    );
}