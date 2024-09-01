'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, TextField } from '@mui/material';




export default function ListForm() {
    const API_URL = "http://localhost:3000/lists/create";
    const {push} = useRouter()
    const [formData, setFormData] = useState({
        name: '',
        description: ''
    });

    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErrorMessage(null); 

        try {
            const user = localStorage.getItem('user')
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
                
                push('/')
                
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

    return (
        <>
            <form onSubmit={handleSubmit}>
                <TextField
                    onChange={handleChange}
                    name= 'name'
                    value={formData.name}
                    placeholder='name'
                />
                <TextField
                    onChange={handleChange}
                    name= 'description'
                    value={formData.description}
                    placeholder='description'
                />
                <Button variant='contained' type="submit">Create</Button>
            </form>
        </>
    );
}
