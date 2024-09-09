"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { TextField, Typography } from "@mui/material";
import {
  StyledBox,
  SecondaryBox,
  StyledButton,
  SignInBox,
  StyledTextField,
  StyledTypography,
  StyledLink,
  StyledErrors,
} from "./styling";
import axios from "axios";

export default function LoginForm() {
  const axiosClient = axios.create({
    baseURL: "http://localhost:3000/auth/login",
    timeout: 1000,
  });
  const { push } = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(null);

    try {
      const response = await axiosClient.post("", formData);
      localStorage.setItem("user", JSON.stringify(response.data));
      push("/");
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setErrorMessage(error.response?.data.message);
      }
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
                Sign in
              </Typography>
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
              <StyledErrors variant="body1">{errorMessage}</StyledErrors>
            )}
            <StyledButton variant="contained" type="submit">
              Login
            </StyledButton>
            <StyledTypography variant="body1">
              Don&apos;t have an account?{" "}
              <StyledLink href="/register">register here</StyledLink>
            </StyledTypography>
          </SecondaryBox>
        </form>
      </StyledBox>
    </>
  );
}
