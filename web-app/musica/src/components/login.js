import { makeStyles } from '@material-ui/core/styles';
import {Button,TextField,FormControlLabel,Checkbox,Link,Grid, Typography, Container} from '@material-ui/core';
import OauthButton from './oauthButton';
import {lookup} from './fetchData/lookup';

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
    margin: theme.spacing(3, 0, 2),
  backgroundColor: theme.palette.action.selected,
  '&:hover':{
    backgroundColor: theme.palette.action.hover,
  },},
  remember: {
    margin: theme.spacing(1, 0, 0),
  },
  text:{
    margin: theme.spacing(1,0,1,0),
    color: theme.palette.text.primary,
    '&:active':{
      color: theme.palette.text.secondary,
    },
  }
}});

export default function Login() {
  function formHandle(event) {
    event.preventDefault();
    let data = {};
    const formdata = new FormData(event.target);
    formdata.forEach((e,v)=>{
      data[v] = e;
    });
    lookup('POST',data,'/api/auth/user/login');
  }
  const classes = useStyles();
  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <OauthButton/>
        <form className={classes.form} onSubmit={formHandle}>
          <TextField
          className={classes.text}
            variant="outlined"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
          />
          
          <TextField
          className={classes.text}
          variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
          <FormControlLabel
            className={classes.remember}
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
          </Grid>
        </form>
      </div>
    </Container>
  );
}