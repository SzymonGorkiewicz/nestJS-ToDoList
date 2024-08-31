'use client';

import React from 'react';
import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';
import { useRouter } from 'next/navigation';

const Navbar = () => {
    const {push} = useRouter()
    const logout = () =>{
        localStorage.removeItem("user")
        push('login')
    }

    return (
        <AppBar position="static">
            <Toolbar>
                <Container maxWidth="lg">
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        To-Do List
                    </Typography>
                    <Button color="inherit" >
                        Home
                    </Button>
                    <Button color="inherit" >
                        About
                    </Button>
                    <Button color="inherit" >
                        Tasks
                    </Button>
                </Container>
                <Button onClick={logout} variant='contained' sx={{
                bgcolor: 'red'
            }}>
            Logout
            </Button>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
