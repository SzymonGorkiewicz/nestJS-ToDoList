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
import axios from "axios";

export default function RegisterForm() {
  const axiosClient = axios.create({
    baseURL: "http://localhost:3000/auth/register",
    timeout: 1000,
  });
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
      await axiosClient.post("", formData);
      push("/login");
    } catch (error: unknown) {
      if (axios.isAxiosError(error))
        setErrorMessage(error.response?.data.message);
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
