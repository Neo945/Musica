import React from 'react'
import {AppBar,Toolbar,IconButton,Typography,Button} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu';

function Navbar(params) {
    return (
            <AppBar position="fixed">
                <Toolbar>
                    <IconButton color="inherit">
                        <MenuIcon/>
                    </IconButton>
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