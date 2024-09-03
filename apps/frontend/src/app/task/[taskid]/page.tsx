'use client'
import TaskView from "../_components/taskView"
import Navbar from "@/app/_components/navbar"
import { ThemeProvider } from "@emotion/react"
import { customtheme } from "@/app/_components/theme"
export default function Page(){
    return(
        <>  
            <ThemeProvider theme={customtheme}>
                <Navbar/>
                <TaskView></TaskView>
            </ThemeProvider> 
        </>
    )
}