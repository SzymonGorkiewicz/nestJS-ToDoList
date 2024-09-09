"use client";

import React from "react";
import { AppBar, Toolbar } from "@mui/material";
import { useRouter } from "next/navigation";
import {
  LogoutButton,
  StyledBox,
  StyledTypography,
} from "./styles/navbarStyles";

const Navbar = () => {
  const { push } = useRouter();
  const logout = () => {
    localStorage.removeItem("user");
    push("/login");
  };

  const handleOnClick = () => {
    push("/");
  };

  return (
    <AppBar position="static" sx={{ mb: 8 }}>
      <Toolbar>
        <StyledBox>
          <StyledTypography
            variant="h6"
            onClick={handleOnClick}
            sx={{ cursor: "pointer" }}
          >
            To-Do List
          </StyledTypography>
        </StyledBox>
        <LogoutButton onClick={logout} variant="contained">
          Logout
        </LogoutButton>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
