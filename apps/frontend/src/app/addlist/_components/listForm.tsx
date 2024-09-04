import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { AddIconStyled, IconBox } from './styling';

interface ListFormProps {
    onListCreated: () => void; 
}
  

export default function ListForm({ onListCreated }: ListFormProps) {
    const API_URL = "http://localhost:3000/lists/create";
    const { push } = useRouter();
    const [formData, setFormData] = useState({
        name: '',
        description: ''
    });
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [open, setOpen] = useState(false);

    

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErrorMessage(null);

        try {
            const user = localStorage.getItem('user');
            const parsedUser = user ? JSON.parse(user) : null;
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${parsedUser.access_token}`
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                const errorResponse = await response.json();
                setErrorMessage(errorResponse.message || 'An error occurred');
            } else {
                const result = await response.json();
                console.log('Response from server:', result);
                onListCreated()
                setOpen(false);
                setFormData({
                    name: '',
                    description: ''
                });
            }
        } catch (error) {
            console.error('Error during form submission:', error);
            setErrorMessage('Failed to submit the form. Please try again.');
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <>  
            <IconBox>
                <AddIconStyled onClick={handleOpen}>
                    Create List
                </AddIconStyled>
            </IconBox>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Create List</DialogTitle>
                <DialogContent>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            onChange={handleChange}
                            name='name'
                            value={formData.name}
                            placeholder='Name'
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            onChange={handleChange}
                            name='description'
                            value={formData.description}
                            placeholder='Description'
                            fullWidth
                            margin="normal"
                        />
                        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                        <DialogActions>
                            <Button onClick={handleClose} color="primary">
                                Cancel
                            </Button>
                            <Button variant='contained' type="submit" color="primary">
                                Create
                            </Button>
                        </DialogActions>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
}
