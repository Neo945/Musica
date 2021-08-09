import { makeStyles } from '@material-ui/core/styles';
import {Button, Icon} from '@material-ui/core';
import FacebookIcon from '@material-ui/icons/Facebook';

const useStyles = makeStyles((theme) => {
    return {
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
          fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
        }
  }});

export default function OauthButton(params) {
  const classes = useStyles();
    return (
        <>
        <form className={classes.form + " " + classes.buttonForm}>
            <Button
              onClick={() => window.location.href = 'http://localhost:5000/api/auth/google'}
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
        </>
    )
}