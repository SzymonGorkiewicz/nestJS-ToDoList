'use client'
import React from 'react';
import { ThemeProvider } from '@mui/material';
import { customtheme } from '../_components/theme';
import withAuth from '../_components/auth'
import Navbar from '../_components/navbar';

const Page: React.FC = () => {
  return (
    <>
      <ThemeProvider theme={customtheme}>
        <Navbar></Navbar>
      </ThemeProvider>
    </>
  );
};

export default withAuth(Page);
