"use client";
import LoginForm from "./_components/loginForm";
import { ThemeProvider } from "@emotion/react";
import { customtheme } from "../_components/theme";
import { GlobalStyles } from "@mui/material";

export default function Page() {
  return (
    <>
      <ThemeProvider theme={customtheme}>
        <GlobalStyles
          styles={{
            body: { backgroundColor: customtheme.palette.background.default },
          }}
        />
        <LoginForm></LoginForm>
      </ThemeProvider>
    </>
  );
}
