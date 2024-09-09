import React, { useState } from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { AddIconStyled, IconBox } from "./styling";
import axios from "axios";

interface ListFormProps {
  onListCreated: () => void;
}

export default function ListForm({ onListCreated }: ListFormProps) {
  const token = JSON.parse(localStorage.getItem("user")!).access_token;
  const axiosClient = axios.create({
    baseURL: "http://localhost:3000/lists/create",
    timeout: 1000,
    headers: { Authorization: `Bearer ${token}` },
  });
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(null);

    try {
      await axiosClient.post("", formData);
      onListCreated();
      setOpen(false);
      setFormData({
        name: "",
        description: "",
      });
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setErrorMessage(
          error.response?.data.message ||
            "Failed to submit the form. Please try again.",
        );
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

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <IconBox>
        <AddIconStyled onClick={handleOpen}>Create List</AddIconStyled>
      </IconBox>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create List</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <TextField
              onChange={handleChange}
              name="name"
              value={formData.name}
              placeholder="Name"
              fullWidth
              margin="normal"
            />
            <TextField
              onChange={handleChange}
              name="description"
              value={formData.description}
              placeholder="Description"
              fullWidth
              margin="normal"
            />
            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button variant="contained" type="submit" color="primary">
                Create
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
