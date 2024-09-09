"use client";

import React, { useState } from "react";
import { Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import {
  SecondaryBox,
  SignInBox,
  StyledBox,
  StyledButton,
  StyledErrors,
  StyledLink,
  StyledTextField,
  StyledTypography,
} from "@/app/login/_components/styling";

export default function RegisterForm() {
  const API_URL = "http://localhost:3000/auth/register";
  const { push } = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    name: "",
  });

  const [errorMessage, setErrorMessage] = useState<string[] | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(null);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        console.log(errorResponse);
        setErrorMessage(errorResponse.message || ["An error occurred"]);
      } else {
        const result = await response.json();
        console.log("Response from server:", result); // Debugging
        push("/login");
      }
    } catch (error) {
      console.error("Error during form submission:", error);
      setErrorMessage(["Failed to submit the form. Please try again."]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <>
      <StyledBox>
        <form onSubmit={handleSubmit}>
          <SecondaryBox>
            <SignInBox>
              <Typography variant="h4" sx={{ letterSpacing: 6 }}>
                Sign up
              </Typography>
            </SignInBox>
            <StyledTextField
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            <StyledTextField
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
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
            {errorMessage && errorMessage.length > 0 && (
              <StyledErrors variant="body2">
                <ul>
                  {errorMessage.map((msg, index) => (
                    <li key={index}>{msg}</li>
                  ))}
                </ul>
              </StyledErrors>
            )}
            <StyledButton variant="contained" type="submit">
              register
            </StyledButton>
            <StyledTypography variant="body1">
              Already have an account?{" "}
              <StyledLink href="/login">sign in</StyledLink>
            </StyledTypography>
          </SecondaryBox>
        </form>
      </StyledBox>
    </>
  );
}
