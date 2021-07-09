import {React,useState} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import {AppBar,Toolbar,IconButton,Typography,Button,Drawer,List,ListItem,ListItemText} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu';

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
        }
    }
})

function Navbar(params) {
    const classes = useStyles();
    const [draw, setDraw] = useState(false);
    return (
            <AppBar position="fixed">
                <Toolbar>
                    <IconButton color="inherit" onClick={()=>{setDraw(true)}}>
                        <MenuIcon/>
                    </IconButton>
                    <Drawer anchor={'left'} open={draw} onClose={()=>{setDraw(false)}}>
                        <div className={classes.drawerList}>
                            <List>
                                <ListItem button>
                                    <ListItemText primary="Hello world"/>
                                </ListItem>
                            </List>
                        </div>
                    </Drawer>
                    <Typography variant="h4" className={classes.title}>
                        Musica
                    </Typography>
                    <Button color="inherit" variant="h6">
                        Login
                    </Button>
                </Toolbar>
            </AppBar>
    )
}
export default Navbar;