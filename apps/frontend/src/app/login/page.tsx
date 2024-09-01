'use client'
import LoginForm from "./_components/loginForm";
import { ThemeProvider } from "@emotion/react";
import { customtheme } from "../_components/theme";

export default function Page() {

    return(
        <>
            <ThemeProvider theme={customtheme}>
                <LoginForm></LoginForm>
            </ThemeProvider>
        </>
    ) 

}