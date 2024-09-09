"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import { customtheme } from "./theme";

const decodeJWT = (token: string) => {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map((c) => `%${("00" + c.charCodeAt(0).toString(16)).slice(-2)}`)
      .join(""),
  );

  return JSON.parse(jsonPayload);
};

const withAuth = (WrappedComponent: React.ComponentType) => {
  const Wrapper: React.FC = (props) => {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [openDialog, setOpenDialog] = useState(false);

    useEffect(() => {
      const user = localStorage.getItem("user");

      if (user) {
        const parsedUser = JSON.parse(user);
        try {
          const { exp } = decodeJWT(parsedUser.access_token);
          if (Date.now() >= exp * 1000) {
            setOpenDialog(true);
            setLoading(false);
          }
          setLoading(false);
        } catch (error) {
          console.error("Error decoding token:", error);
          router.push("/login");
        }
      } else {
        router.push("/login");
      }
    }, [router]);

    if (loading) {
      return <div>Checking Authentication...</div>;
    }

    const handleDialogClose = () => {
      localStorage.removeItem("user");
      setOpenDialog(false);
      router.push("/login");
    };

    if (openDialog) {
      return (
        <>
          <ThemeProvider theme={customtheme}>
            <Dialog open={openDialog} onClose={handleDialogClose}>
              <DialogTitle>Session Expired</DialogTitle>
              <DialogContent>
                Your session has expired. Please log in again.
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={handleDialogClose}
                  variant="contained"
                  color="primary"
                >
                  Sign In
                </Button>
              </DialogActions>
            </Dialog>
          </ThemeProvider>
        </>
      );
    }

    return <WrappedComponent {...props} />;
  };

  return Wrapper;
};

export default withAuth;
