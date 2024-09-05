'use client'
import React from 'react';
import Navbar from './_components/navbar';
import withAuth from './_components/auth';
import Lists from './_components/lists';
import { GlobalStyles, ThemeProvider } from '@mui/material';
import { customtheme } from './_components/theme';
import { HomePageBox } from './_components/styles/homepageStyles';

const Page: React.FC = () => {

  return (
    <>
      <ThemeProvider theme={customtheme}>
      <GlobalStyles styles={{ body: { backgroundColor: customtheme.palette.background.default } }} />
        <Navbar></Navbar>
          <HomePageBox>
            <Lists></Lists>
          </HomePageBox>
      </ThemeProvider>
    </>
  );
};

export default withAuth(Page);
