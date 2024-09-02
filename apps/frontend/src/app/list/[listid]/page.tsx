'use client'
import React, { useState } from 'react';
import withAuth from '../../_components/auth';
import ListViewForm from '../_components/listViewForm';
import { ThemeProvider } from '@emotion/react';
import { customtheme } from '../../_components/theme';

const Page: React.FC = () => {
  return (
    <>
        <ThemeProvider theme={customtheme}>
            <ListViewForm/>
        </ThemeProvider>
    </>
  );
};

export default withAuth(Page);
