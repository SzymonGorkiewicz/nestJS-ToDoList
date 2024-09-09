"use client";

import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

interface DeleteListProps {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const DeleteList: React.FC<DeleteListProps> = ({
  open,
  onConfirm,
  onCancel,
}) => {
  return (
    <>
      <Dialog open={open} onClose={onCancel}>
        <DialogTitle>Confirm deletion</DialogTitle>
        <DialogContent>
          <DialogActions>
            <Button onClick={onCancel} color="primary">
              Cancel
            </Button>
            <Button variant="contained" onClick={onConfirm} color="primary">
              Delete
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DeleteList;
