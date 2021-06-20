import {React,useState} from 'react'
import {AppBar,Toolbar,IconButton,Typography,Button,Drawer,List,ListItem,ListItemIcon,ListItemText} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu';

function Navbar(params) {
    const [draw, setDraw] = useState(false);
    return (
            <AppBar position="fixed">
                <Toolbar>
                    <IconButton color="inherit" onClick={()=>{setDraw(true)}}>
                        <MenuIcon/>
                    </IconButton>
                    <Drawer anchor={'left'} open={draw} onClose={()=>{setDraw(false)}}>
                        <div style={{width:'260px'}}>
                            <List>
                                <ListItem button>
                                    <ListItemText primary="Hello world"/>
                                </ListItem>
                            </List>
                        </div>
                    </Drawer>
                    <Typography variant="h4" style={{'flexGrow':1,'fontFamily':"'Dancing Script', cursive",'fontWeight':'bold','marginLeft':'25px'}}>
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