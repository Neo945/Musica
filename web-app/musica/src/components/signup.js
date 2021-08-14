import { makeStyles } from '@material-ui/core/styles';
import {Button,TextField,Grid, Typography, Container, IconButton, InputAdornment,FormControlLabel,Checkbox} from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
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
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    backgroundColor: theme.palette.action.selected,
    '&:hover':{
      backgroundColor: theme.palette.action.hover,
    },width: '80%',
  },
    btn: {
      backgroundColor: theme.palette.action.selected,
      '&:hover':{
        backgroundColor: theme.palette.action.hover,
      },
    },
    remember: {
      margin: theme.spacing(1, 0, 0),
    },
  textField:{
    margin: theme.spacing(1),
  },
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
            className={classes.btn}
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
function PasswordSignup(params) {
  const classes = useStyles();
  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
          <TextField
          className={classes.textField}
            variant="outlined"
            required
            fullWidth
            id="password"
          label="Password"
          type="password"
          autoComplete="current-password"
          />
          <TextField
          className={classes.textField}
          variant="outlined"
            required
            fullWidth
            id="password"
          label="Confirm Password"
          type="password"
          autoComplete="current-password"
          />
          <Typography style={{color:"gray",fontSize:"0.75em"}}>
          * Sign Up Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus at dictum purus. Sed finibus mollis augue, ut congue est consequat rhoncus. Nullam eget ultrices velit.
        </Typography>
          <Container style={{display:'flex', justifyContent:'space-around',width:"100%"}}>
        <IconButton aria-label="back" onClick={() => params.fun(0)}>
          <ArrowBackIosIcon />
        </IconButton>
        <Button
            fullWidth
            variant="contained"
            color="primary"
            className={'submit ' + classes.submit}
            onClick={() => params.fun(2)}
          >
            Continue
          </Button>
        </Container>
        </div>
    </Container>
  );
}
function UserInfoSignup(params) {
  const classes = useStyles();
  return (
    <Container component="div" className={classes.paper} maxWidth="xs">
      <TextField
      className={classes.textField}
          id="username"
          fullWidth
          variant="outlined"
          label="Userame"
        />
         <TextField
      className={classes.textField}
          id="username"
          fullWidth
          variant="outlined"
          label="Phone Number"
          InputProps={{
            startAdornment: <InputAdornment position="start">+91 </InputAdornment>,
          }}

        />
      <TextField
      className={classes.textField}
          id="age"
          fullWidth
          variant="outlined"
          label="Age"
          type="number"
        />
        <FormControlLabel
            className={classes.remember}
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
        {/* <Button
            fullWidth
            variant="contained"
            color="primary"
            className={'submit ' + classes.submit}
          >
            Save
          </Button> */}
          <Container style={{display:'flex', justifyContent:'space-around',width:"100%"}}>
        <IconButton aria-label="back" onClick={() => params.fun(1)}>
          <ArrowBackIosIcon />
        </IconButton>
        <Button
            fullWidth
            variant="contained"
            color="primary"
            className={'submit ' + classes.submit}
            // onClick={() => params.fun()}
          >
            Save
          </Button>
        </Container>
        
    </Container>
  );
}
export default function Signup() {
  const [step,setStep] = useState(0);
  return (
    <div>
      {step === 0 ? <EmailInputSignup fun={setStep}/> : step===1 ? <PasswordSignup fun={setStep}/> : <UserInfoSignup fun={setStep}/>}
    </div>
  );
}