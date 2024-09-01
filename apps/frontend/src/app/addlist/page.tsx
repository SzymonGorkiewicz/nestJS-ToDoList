'use client'
import React from 'react';
import { ThemeProvider } from '@mui/material';
import { customtheme } from '../_components/theme';
import withAuth from '../_components/auth'
import ListForm from './_components/listForm';
import Navbar from '../_components/navbar';

const Page: React.FC = () => {
  return (
    <>
      <ThemeProvider theme={customtheme}>
        <Navbar></Navbar>
        <ListForm></ListForm>
      </ThemeProvider>
    </>
  );
};

export default withAuth(Page);
