import {React,useState} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import {AppBar,Toolbar,IconButton,Typography,Button,Drawer,List,ListItem,ListItemText} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu';
import {Link} from 'react-router-dom';

const useStyles = makeStyles((theme) => {
    return {
        drawerList:{
            width:'260px'
        },
        title:{
            flexGrow:1,
            fontFamily:"'Dancing Script', cursive",
            fontWeight:'bold',
            marginLeft:'25px'
        },
        navbar: {
            backgroundColor: theme.palette.background.paper,
        },
    }
})

function Navbar(params) {
    const classes = useStyles();
    const [draw, setDraw] = useState(false);
    return (
            <AppBar position="fixed" className={classes.navbar}>
                <Toolbar>
                    <IconButton color="inherit" onClick={()=>{setDraw(true)}}>
                        <MenuIcon/>
                    </IconButton>
                    <Drawer anchor={'left'} open={draw} onClose={()=>{setDraw(false)}}>
                        <div className={classes.drawerList}>
                            <List>
                                <ListItem button>
                                    <ListItemText primary="Login"/>
                                </ListItem>
                            </List>
                        </div>
                    </Drawer>
                    <Typography variant="h4" className={classes.title}>
                        Musica
                    </Typography>
                    <Link to='/' style={{textDecoration:'none',color:'white'}}>
                        <Button color="inherit" >
                        {window.location.pathname==='/login' ? 'Register' : window.location.pathname==='/signup' ? 'Login' : "Logout"}
                        </Button>
                    </Link>
                </Toolbar>
            </AppBar>
    )
}
export default Navbar;