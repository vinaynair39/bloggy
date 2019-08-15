import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/Toolbar';
import Button from '@material-ui/Button';




 const NavBar = () => (
    <div>
        <AppBar>
            <Toolbar>
                <Button color='inherit'>DashBoard</Button>
                <Button color='inherit'>Add Blog</Button>
                <Button color='inherit'>Logout</Button>
            </Toolbar>
        </AppBar>
    </div>
)

export default NavBar;