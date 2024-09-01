'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { TextField, Typography } from '@mui/material';
import { StyledBox, SecondaryBox, StyledButton, SignInBox, StyledTextField, StyledTypography, StyledLink, StyledErrors } from './styling';


export default function LoginForm() {
    const API_URL = "http://localhost:3000/auth/login";
    const {push} = useRouter()
    const [formData, setFormData] = useState({
        username: '',
        password: ''
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
            <StyledBox>
                <form onSubmit={handleSubmit}>
                    
                    <SecondaryBox>
                        <SignInBox>
                            <Typography variant='h4' sx={{letterSpacing:6}}>Sign in</Typography>
                        </SignInBox>
                        <StyledTextField
                            label="Username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                        />
                        <StyledTextField
                            type="password"
                            label="Password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                        {errorMessage && (
                            <StyledErrors variant="body1">
                                {errorMessage}
                            </StyledErrors>
                        )}
                        <StyledButton variant="contained" type="submit">
                            Login
                        </StyledButton>
                        <StyledTypography variant='body1'>Don't have an account? <StyledLink href='/register'>register here</StyledLink></StyledTypography>
                    </SecondaryBox>
                </form>
            </StyledBox>
        </>
    );
}
