import { makeStyles } from '@material-ui/core/styles';
import {Button,TextField,Grid, Typography, Container, IconButton, InputAdornment,FormControlLabel,Checkbox} from '@material-ui/core';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import OauthButton from './oauthButton';
import { useState } from 'react';

const useStyles = makeStyles((theme) => {
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
    },
    color: theme.palette.text.primary,
    width: '80%',
    // borderRadius: '20px',
  },
  btn: {
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.action.selected,
    '&:hover':{
      backgroundColor: theme.palette.action.hover,
    },
    // borderRadius: '20px',
  },
  cssLabel: {
    color : 'white'
  },
  container: {
    display:'flex',
    justifyContent:'space-around',
    width:"100%",
  },
    remember: {
      margin: theme.spacing(1, 0, 0),
    },
  textField:{
    color: theme.palette.action.hover,
    borderColor: theme.palette.action.hover,
    margin: theme.spacing(1),
  },
  cssOutlinedInput: {
    '&$cssFocused $notchedOutline': {
      borderColor: `${theme.palette.action.active} !important`,
    }
  },
  cssFocused: {},

  notchedOutline: {
    borderWidth: '1px',
    borderColor: `${theme.palette.action.hover} !important`
  },
}});

function EmailInputSignup(params) {
  const classes = useStyles();
  const [email,setEmail] = useState('');
  function formHandle(event) {
    event.preventDefault();
    params.fun(1);
    const state = {...params.state};
    state.email = email;
    params.update(state);
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
            value={params.state.email==='' ? email : params.state.email}
            onChange={(event) => {
              if (params.state.email!==''){
                const state = {...params.state};
                state.email = '';
                params.update(state);
              }
              setEmail(event.target.value);
            }}
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            className={classes.textField}
          />
          <Typography style={{color:"gray",fontSize:"0.75em", margin: '5px'}}>
          * Sign Up Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus at dictum purus. Sed finibus mollis augue, ut congue est consequat rhoncus. Nullam eget ultrices velit.
        </Typography>
          <Button
            type="submit"
            fullWidth
            variant="contained"
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
  const [pass, setPass] = useState('');
  const [cPass, setCPass] = useState('');
  const [error, setEror] = useState({error: false, message: ''});
  function formHandle(event) {
    event.preventDefault();
    if (pass===cPass){
      params.fun(2);
      const state = {...params.state};
      state.password = pass;
      state.password2 = cPass;
      params.update(state);
    }else{
      setEror({error: true, message: 'The passwords are not equal'});
    }
  }
  return (
    <Container component="main" maxWidth="xs">
      <form className={classes.form} onSubmit={formHandle}>
      <div className={classes.paper}>
          <TextField
            error={error.error}
            helperText={error.message}
            className={classes.textField}
            variant="outlined"
            required
            fullWidth
            value={params.state.password==='' ? pass : params.state.password}
            onChange={(event)=>{
              if (params.state.password!==''){
                const state = {...params.state};
                state.password = '';
                params.update(state);
              }
              setEror({error: false, message: ''});
              setPass(event.target.value);
            }}
            id="password"
            label="Password"
            type="password"
            autoComplete="current-password"
          />
          <TextField
            error={error.error}
            helperText={error.message}          
            className={classes.textField}
            variant="outlined"
            required
            value={params.state.password2==='' ? cPass : params.state.password2}
            onChange={(event)=>{
              if (params.state.password2!==''){
                const state = {...params.state};
                state.password2 = '';
                params.update(state);
              }
              setEror({error: false, message: ''});
              setCPass(event.target.value);
            }}
            fullWidth
            id="password2"
            label="Confirm Password"
            type="password"
            autoComplete="current-password"
          />
          <Typography style={{color:"gray",fontSize:"0.75em"}}>
          * Sign Up Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus at dictum purus. Sed finibus mollis augue, ut congue est consequat rhoncus. Nullam eget ultrices velit.
        </Typography>
          <Container className={classes.container}>
        <IconButton aria-label="back" onClick={() => params.fun(0)}>
          <ChevronLeft />
        </IconButton>
        <Button
            fullWidth
            type="submit"
            variant="contained"
            className={'submit ' + classes.submit}
          >
            Continue
          </Button>
        </Container>
        </div>
        </form>
    </Container>
  );
}
function UserInfoSignup(params) {
  const classes = useStyles();
  const [username,setUsername] = useState('');
  const [phone,setPhone] = useState('');
  const [age,setAge] = useState(12);
  return (
    <Container component="div" className={classes.paper} maxWidth="xs">
      <form className={classes.form} onSubmit={(event)=> event.preventDefault()}>
      <TextField
      className={classes.textField}
          id="username"
          fullWidth
          required
          variant="outlined"
          label="Userame"
          value={params.state.username==='' ? username : params.state.username}
          onChange={(event)=>{
            if (params.state.password!==''){
              const state = {...params.state};
              state.username = '';
              params.update(state);
            }
            setUsername(event.target.value);
          }}
        />
         <TextField
          className={classes.textField}
          id="phone"
          required
          fullWidth
          variant="outlined"
          label="Phone Number"
          InputProps={{
            startAdornment: <InputAdornment position="start">+91 </InputAdornment>,
          }}
          value={params.state.phone==='' ? phone : params.state.phone}
          onChange={(event)=>{
            if (params.state.phone!==''){
              const state = {...params.state};
              state.phone = '';
              params.update(state);
            }
            if (isNaN(parseInt(event.target.value.slice(event.target.value.length-1))) || phone.length>9){
              setPhone(event.target.value.slice(0,phone.length));
              return;
            }
            setPhone(event.target.value);
          }}
        />
      <TextField
      className={classes.textField}
          id="age"
          required
          fullWidth
          variant="outlined"
          label="Age"
          type="number"
          value={age}
          onChange={(event) => {
              setAge(parseInt(event.target.value));
          }}
        />
        <FormControlLabel
            className={classes.remember}
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Container className={classes.container}>
        <IconButton aria-label="back" onClick={() => params.fun(1)}>
          <ChevronLeft />
        </IconButton>
        <Button
            fullWidth
            variant="contained"
            type="submit"
            className={'submit ' + classes.submit}
            // onClick={() => params.fun()}
          >
            Save
          </Button>
        </Container>
        </form>
    </Container>
  );
}
// let value = {
  // email:'',
  // password: '',
  // password2: '',
  // phone: '',
  // username: '',
// }
export default function Signup() {
  const [value,setValue] = useState({
    email:'',
    password: '',
    password2: '',
    phone: '',
    username: '',
    age: 0
  });
  const [step,setStep] = useState(0);
  return (
    <div>
      {step === 0 ? 
        <EmailInputSignup state={value} update={setValue} fun={setStep}/> : step===1 ? 
        <PasswordSignup state={value} update={setValue} fun={setStep}/> : 
        <UserInfoSignup state={value} update={setValue} fun={setStep}/>
      }
    </div>
  );
}