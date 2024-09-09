"use client";
import TaskView from "../_components/taskView";
import Navbar from "@/app/_components/navbar";
import { ThemeProvider } from "@emotion/react";
import { customtheme } from "@/app/_components/theme";
import { GlobalStyles } from "@mui/material";
import withAuth from "@/app/_components/auth";

const Page: React.FC = () => {
  return (
    <>
      <ThemeProvider theme={customtheme}>
        <GlobalStyles
          styles={{
            body: { backgroundColor: customtheme.palette.background.default },
          }}
        />
        <Navbar />
        <TaskView></TaskView>
      </ThemeProvider>
    </>
  );
};

export default withAuth(Page);
