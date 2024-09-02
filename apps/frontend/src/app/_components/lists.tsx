'use client'
/* eslint-disable react/no-unescaped-entities */

import React, { useEffect, useState } from 'react';
import { Typography, Container, Button, Box } from '@mui/material';
import { useRouter } from 'next/navigation';
import { ListBox, ActionsBox, WholeContainer } from './styles/listsStyles';
import DeleteList from './deletelist';
import EditList from './editlist';
interface List {
    name:string
    description:string
    id:number

}

const Lists: React.FC = () => {
  const [lists, setLists] = useState<List[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);
  const [listToDelete, setListToDelete] = useState<number | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState<boolean>(false);
  const [listToEdit, setListToEdit] = useState<List | null>(null);

  const editButtonClicked = (list: List) => {
      setListToEdit(list);
      setEditDialogOpen(true);
  };

  const deleteButtonClicked = (listId: number) => {
    setListToDelete(listId);
    setDeleteDialogOpen(true);
    
  };

  const handleDeleteConfirm = async () => {
    console.log("JD")
    if (listToDelete !== null) {
        try {
            const user = localStorage.getItem('user');
            if (user) {
                const parsedUser = JSON.parse(user);
                const token = parsedUser.access_token;

                const response = await fetch(`http://localhost:3000/lists/${listToDelete}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (response.ok) {
                    setLists((prev) => prev.filter((list) => list.id !== listToDelete));
                    setListToDelete(null);
                    setDeleteDialogOpen(false);
                } else {
                    console.error('Failed to delete the list');
                }
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }
  };

  const handleDeleteCancel = () => {
    setListToDelete(null);
    setDeleteDialogOpen(false);
  };

  const handleEditConfirm = async (name: string, description: string) => {
    if (listToEdit) {
        try {
            const user = localStorage.getItem('user');
            if (user) {
                const parsedUser = JSON.parse(user);
                const token = parsedUser.access_token;

                const response = await fetch(`http://localhost:3000/lists/${listToEdit.id}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({ name, description })
                });

                if (response.ok) {
                    setLists((prev) =>
                        prev.map((list) =>
                            list.id === listToEdit.id
                                ? { ...list, name, description }
                                : list
                        )
                    );
                    setListToEdit(null);
                    setEditDialogOpen(false);
                } else {
                    console.error('Failed to update the list');
                }
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }
  };

  const handleEditCancel = () => {
      setListToEdit(null);
      setEditDialogOpen(false);
  };

  const showTasks = (list: List) =>{
    const listString = encodeURIComponent(JSON.stringify(list));
    router.push(`/list/${list.id}?list=${listString}`)
  }

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
            <WholeContainer>
              <ListBox key={list.id} onClick={()=>showTasks(list)}>{list.name}{list.description}</ListBox>
              <ActionsBox className='actions'>
                <Button onClick={()=>editButtonClicked(list)} >edit</Button>
                <Button onClick={()=>deleteButtonClicked(list.id)}>delete</Button>
              </ActionsBox>
            </WholeContainer>
          ))
        )}
      </ul>
      {deleteDialogOpen && (
                <DeleteList
                    open={deleteDialogOpen}
                    onConfirm={handleDeleteConfirm}
                    onCancel={handleDeleteCancel}
                />
            )}
      {editDialogOpen && listToEdit && (
                <EditList
                    open={editDialogOpen}
                    initialName={listToEdit.name}
                    initialDescription={listToEdit.description}
                    onConfirm={handleEditConfirm}
                    onCancel={handleEditCancel}
                />
            )}
    </Container>
  );
};

export default Lists;
