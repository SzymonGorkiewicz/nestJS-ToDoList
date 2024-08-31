'use client'

import React from 'react';
import Navbar from './_components/navbar';
import withAuth from './_components/auth';
import Lists from './_components/lists';
const Page: React.FC = () => {
  return (
    <>
      <Navbar />
     <Lists></Lists>
    </>
  );
};

export default withAuth(Page);
