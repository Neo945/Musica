import { makeStyles } from '@material-ui/core/styles';
import {Button,TextField,FormControlLabel,Checkbox,Link,Grid, Typography, Container, Icon} from '@material-ui/core';
import FacebookIcon from '@material-ui/icons/Facebook';

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
  },
  icon:{
    display: "flex",
    width: "inherit",
    height: "inherit",
  },
  googleButton:{
    margin: theme.spacing(2,0,0,0),
  },
  buttonForm:{
    margin: theme.spacing(2,0,2,0),
  },
  divider:{
    // width:"100%",
    // margin: theme.spacing(1),
    // background:"black",
    // height:'1.5px',
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
  }
}});

export default function Login() {
  const classes = useStyles();
  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form + " " + classes.buttonForm}>
        <Button
          variant="contained"
          color="primary"
            fullWidth
            className={classes.googleButton}
          startIcon={<Icon>
            <img className={classes.icon} src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/600px-Google_%22G%22_Logo.svg.png" alt=""/>
          </Icon>}
        >
          Login with Google
        </Button>
        <Button
          variant="contained"
          color="primary"
            fullWidth
            className={classes.googleButton}
          startIcon={<FacebookIcon/>}
        >
          Login with Facebook
        </Button>
        <Button
          variant="contained"
          color="primary"
            fullWidth
            className={classes.googleButton}
          startIcon={<Icon>
            <img className={classes.icon} src="https://www.pngkit.com/png/full/490-4902364_deezer-logo-white-png-spotify-icon-png-white.png" alt=""/>
          </Icon>}
        >
          Login with Spotify
        </Button>
        </form>
        <div className={"seperator " + classes.divider}>Or</div>
        <form className={classes.form}>
          <TextField
            variant="outlined"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
          />
          
          <TextField
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