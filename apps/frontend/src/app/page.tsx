'use client'
import React, { useState } from 'react';
import Navbar from './_components/navbar';
import withAuth from './_components/auth';
import Lists from './_components/lists';
import { ThemeProvider } from '@mui/material';
import { customtheme } from './_components/theme';
import ListForm from './addlist/_components/listForm';


const Page: React.FC = () => {
  const [seed, setSeed] = useState(1);

  const refreshLists = () => {
    setSeed(prevSeed => prevSeed + 1);
  };

  return (
    <>
      <ThemeProvider theme={customtheme}>
        <Navbar></Navbar>
        <ListForm onListCreated={refreshLists} />
        <Lists key={seed}></Lists>
      </ThemeProvider>
    </>
  );
};

export default withAuth(Page);
