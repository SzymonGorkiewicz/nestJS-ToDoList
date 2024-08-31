'use client';

import React, { useState } from 'react';
import { Button, TextField, Box, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';

export default function RegisterForm() {
    const API_URL = "http://localhost:3000/auth/register";
    const {push} = useRouter()
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        email: '',
        name: ''
    });

    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErrorMessage(null); 

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                const errorResponse = await response.json();
                setErrorMessage(errorResponse.message || 'An error occurred');
            } else {
                const result = await response.json();
                console.log('Response from server:', result); // Debugging
                
                
                localStorage.setItem('user', JSON.stringify(result));
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
            <Box sx={{
                width: '100vw',
                height: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <form onSubmit={handleSubmit}>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            width: '30vw',
                            height: 'auto',
                            border: 1,
                            borderRadius: 5,
                            gap: 2
                        }}
                    >
                        <h1>Sign in</h1>
                        <TextField
                            label="Name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                        />
                        <TextField
                            label="Email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                        <TextField
                            label="Username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                        />
                        <TextField
                            type="password"
                            label="Password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                        <Button
                            variant="contained"
                            type="submit"
                            sx={{
                                mb: 5,
                                mt: 2,
                                bgcolor: 'gray',
                                '&:hover': {
                                    bgcolor: 'darkgray'
                                }
                            }}
                        >
                            register
                        </Button>
                        {/* Conditional rendering for error message */}
                        {errorMessage && (
                            <Typography color="error" variant="body2">
                                {errorMessage}
                            </Typography>
                        )}
                    </Box>
                </form>
            </Box>
        </>
    );
}
