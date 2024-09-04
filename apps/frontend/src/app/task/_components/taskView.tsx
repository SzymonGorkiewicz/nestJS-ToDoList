import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography } from '@mui/material';
import { BackIcon } from '@/app/list/_components/styles';

interface List{
    id:number
}

interface Task{
    title:string,
    description: string
    id:number
    list: List
}

export default function TaskView(){
    const [task, setTask] = useState<Task | null>(null);
    const params = useParams()
    const {push} = useRouter()
    const API_URL = 'http://localhost:3000/tasks';
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [editedTask, setEditedTask] = useState<Task | null>(null);
    const taskId = parseInt(params.taskid as string, 10);
    

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user')!)
        const fetchTask = async (taskId: number) => {
            console.log(taskId)
            try {
                const response = await fetch(`${API_URL}/get/${taskId}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${user.access_token}`
                    },
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch task');
                }
                const taskData = await response.json();
                setTask(taskData);
                setEditedTask(taskData);
            } catch (error) {
                console.error(error);
            }
        };
        fetchTask(taskId)
    }, []);

    const deleteTask = async (taskId: number) => {
        const user = JSON.parse(localStorage.getItem('user')!)
        try {
            const response = await fetch(`${API_URL}/${taskId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.access_token}`
                },
            });
    
            if (!response.ok) {
                throw new Error('Failed to delete task');
            }
            setOpenDeleteDialog(false)
            console.log('Task deleted successfully');
            if (task){
                console.log(task)
                push(`/list/${task.list.id}`) 
            }
        } catch (error) {
            console.error(error);
        }
    };

    const editTask = async (task: Task) => {
        const user = JSON.parse(localStorage.getItem('user')!)
        try {
            const response = await fetch(`${API_URL}/${task.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.access_token}`
                },
                body: JSON.stringify(task),
            });
    
            if (!response.ok) {
                throw new Error('Failed to update task');
            }
            setOpenEditDialog(false)
            setTask(task)
            console.log('Task updated successfully');
        } catch (error) {
            console.error(error);
        }
    };

    const handleEditTaskChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (editedTask) {
            setEditedTask(prev => ({
                ...prev!,
                [name]: value
            }));
        }
    };

    if (!task) return <div>Loading...</div>;

    return(
        <>  <BackIcon onClick={()=>push(`/list/${task.list.id}`)}></BackIcon>
            <Button variant='contained' onClick={()=>setOpenEditDialog(true)}>edit</Button>
            <Button variant='contained' onClick={()=>setOpenDeleteDialog(true)}>delete</Button>
            <div>
                <h1>Task Details</h1>
                <p>{task.title}</p>
                <p>{task.description}</p>
            </div>
            <Dialog open={openEditDialog} onClose={()=>setOpenEditDialog(false)}>
                <DialogTitle>Edit Task</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Title"
                        type="text"
                        fullWidth
                        variant="outlined"
                        name='title'
                        value={editedTask?.title || ''}
                        onChange={handleEditTaskChange}
                    />
                    <TextField
                        margin="dense"
                        label="Description"
                        type="text"
                        fullWidth
                        variant="outlined"
                        name='description'
                        value={editedTask?.description || ''}
                        onChange={handleEditTaskChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={()=>setOpenEditDialog(false)}>Cancel</Button>
                    <Button onClick={()=>editedTask && editTask(editedTask)}>Save</Button>
                </DialogActions>
            </Dialog>
            <Dialog open={openDeleteDialog} onClose={()=>setOpenDeleteDialog(false)}>
                <DialogTitle>Confirm Delete</DialogTitle>
                <DialogContent>
                    <Typography>Are you sure you want to delete this task?</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={()=>setOpenDeleteDialog(false)}>Cancel</Button>
                    <Button onClick={()=>deleteTask(task.id)} color="error">Delete</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}