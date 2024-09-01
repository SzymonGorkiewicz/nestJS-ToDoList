'use client'

import RegisterForm from "./_components/registerForm";
import { ThemeProvider } from "@mui/material";
import { customtheme } from "../_components/theme";
export default function Page() {
    return (
    <>
        <ThemeProvider theme={customtheme}>
            <RegisterForm></RegisterForm>
        </ThemeProvider>
    </>
    
    )
}