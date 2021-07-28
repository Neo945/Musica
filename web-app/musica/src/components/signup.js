import { makeStyles } from '@material-ui/core/styles';
import {Button,TextField,Grid, Typography, Container} from '@material-ui/core';
import OauthButton from './oauthButton';
import { useState } from 'react';

const useStyles = makeStyles((theme) => {
  console.log(theme.spacing(1,1,1,1))
  return {
  paper: {
    marginTop: theme.spacing(20),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  remember: {
    margin: theme.spacing(1, 0, 0),
  }
}});

function EmailInputSignup(params) {
  const classes = useStyles();
  function formHandle(event) {
    event.preventDefault();
    let data = {};
    const formdata = new FormData(event.target);
    formdata.forEach((e,v)=>data[v] = e);
    console.log(formdata);
    params.fun(1);
  }
  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <OauthButton/>
        <form className={classes.form} onSubmit={formHandle}>
          <TextField
            variant="outlined"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
          />
          <Typography style={{color:"gray",fontSize:"0.75em"}}>
          * Sign Up Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus at dictum purus. Sed finibus mollis augue, ut congue est consequat rhoncus. Nullam eget ultrices velit.
        </Typography>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
function UserDataInutSignup(params) {
  const classes = useStyles();
  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}></div>
      <Button
            variant="contained"
            color="primary"
            className={'submit'}
            onClick={() => params.fun(0)}
          >
            Back
          </Button>
    </Container>
  );
}
export default function Signup() {
  const [step,setStep] = useState(0);
  return (
    <div>
      {step === 0 ? <EmailInputSignup fun={setStep}/> : <UserDataInutSignup fun={setStep}/>}
    </div>
  );
}