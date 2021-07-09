import { makeStyles } from '@material-ui/core/styles';
import {Button,TextField,Grid, Typography, Container} from '@material-ui/core';
import OauthButton from './oauthButton';

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

export default function Signup() {
  const classes = useStyles();
  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <OauthButton/>
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