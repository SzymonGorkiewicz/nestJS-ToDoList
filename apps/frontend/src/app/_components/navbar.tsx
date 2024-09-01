'use client';

import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { LogoutButton, StyledBox, StyledLink, StyledTypography } from './styles/navbarStyles';

const Navbar = () => {
    const {push} = useRouter()
    const logout = () =>{
        localStorage.removeItem("user")
        push('login')
    }


    const handleOnClick = () =>{
        push('/')
    }

    return (
        <AppBar position="static" sx={{mb:2}}>
            <Toolbar>
                <StyledBox>
                    <StyledTypography variant="h6" onClick={handleOnClick} sx={{cursor: 'pointer'}}>
                        To-Do List
                    </StyledTypography>
                    <StyledLink href="/addlist">create list</StyledLink>
                </StyledBox>
                <LogoutButton onClick={logout} variant='contained'>
                        Logout
                </LogoutButton>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
