'use client';

import React, { useState, useEffect } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';

interface EditListProps {
    open: boolean;
    initialName: string;
    initialDescription: string;
    onConfirm: (name: string, description: string) => void;
    onCancel: () => void;
}

const EditList: React.FC<EditListProps> = ({ open, initialName, initialDescription, onConfirm, onCancel }) => {
    const [name, setName] = useState<string>(initialName);
    const [description, setDescription] = useState<string>(initialDescription);

    useEffect(() => {
        setName(initialName);
        setDescription(initialDescription);
    }, [initialName, initialDescription]);

    const handleConfirm = () => {
        onConfirm(name, description);
    };

    return (
        <Dialog open={open} onClose={onCancel}>
            <DialogTitle>Edit List</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    label="Name"
                    type="text"
                    fullWidth
                    variant="outlined"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <TextField
                    margin="dense"
                    label="Description"
                    type="text"
                    fullWidth
                    variant="outlined"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onCancel} color="primary">
                    Cancel
                </Button>
                <Button variant='contained' color="primary" onClick={handleConfirm}>
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditList;
