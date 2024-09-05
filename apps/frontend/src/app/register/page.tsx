'use client'

import RegisterForm from "./_components/registerForm";
import { GlobalStyles, ThemeProvider } from "@mui/material";
import { customtheme } from "../_components/theme";
export default function Page() {
    return (
    <>
        <ThemeProvider theme={customtheme}>
            <GlobalStyles styles={{ body: { backgroundColor: customtheme.palette.background.default } }} />
            <RegisterForm></RegisterForm>
        </ThemeProvider>
    </>
    
    )
}