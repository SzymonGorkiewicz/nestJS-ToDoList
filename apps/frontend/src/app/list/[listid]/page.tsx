'use client'
import React from 'react';
import withAuth from '../../_components/auth';
import ListViewForm from '../_components/listViewForm';
import { ThemeProvider } from '@emotion/react';
import { customtheme } from '../../_components/theme';
import { GlobalStyles } from '@mui/material';

const Page: React.FC = () => {
  return (
    <>
        <ThemeProvider theme={customtheme}>
        <GlobalStyles styles={{ body: { backgroundColor: customtheme.palette.background.default } }} />
            <ListViewForm/>
        </ThemeProvider>
    </>
  );
};

export default withAuth(Page);
