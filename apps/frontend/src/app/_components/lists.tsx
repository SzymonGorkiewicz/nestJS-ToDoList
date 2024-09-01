'use client'
/* eslint-disable react/no-unescaped-entities */

import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Typography, Container } from '@mui/material';
import { useRouter } from 'next/navigation';

interface List {
    name:string
    description:string
    id:number

}

const Lists: React.FC = () => {
  const [lists, setLists] = useState<List[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const fetchLists = async () => {
      try {
        let user = localStorage.getItem('user');
        if (!user) {
          return;
        }

        const parsedUser = JSON.parse(user);
        const token = parsedUser.access_token;

        
        const response = await fetch(`http://localhost:3000/lists/${parsedUser.id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch lists');
        }

        const data = await response.json();
        setLists(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchLists();
  }, [router]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        User's Lists
      </Typography>
      <ul>
        {lists.length === 0 ? (
          <p>No lists found.</p>
        ) : (
          lists.map((list) => (
            <div key={list.id}>{list.name}{list.description}</div> 
          ))
        )}
      </ul>
    </Container>
  );
};

export default Lists;
