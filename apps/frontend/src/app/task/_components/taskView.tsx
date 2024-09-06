import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button, Container, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography } from '@mui/material';
import { BackIcon } from '@/app/list/_components/styles';
import { ButtonsBox, DeleteBox, DescriptionBox, DetailsBox, EditBox, TitleBox, WholeContainer } from './styles';
import { StyledEditButton, StyledDeleteButton } from '@/app/_components/styles/listsStyles';

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
        
        const updatedTask = {
            title: task.title,
            description: task.description,
            list: task.list.id,
        };

        try {
            const response = await fetch(`${API_URL}/${taskId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.access_token}`
                },
                body: JSON.stringify(updatedTask),
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
            <Container>
                <WholeContainer>
                    <ButtonsBox>
                        <EditBox>
                            <StyledEditButton sx={{fontSize: 130}} onClick={()=>setOpenEditDialog(true)}>edit</StyledEditButton>
                        </EditBox>
                        <DeleteBox>
                            <StyledDeleteButton sx={{fontSize: 130}} onClick={()=>setOpenDeleteDialog(true)}>delete</StyledDeleteButton>
                        </DeleteBox> 
                    </ButtonsBox>
                    <DetailsBox>
                        <TitleBox>
                            <Typography variant='h3'>{task.title}</Typography>
                        </TitleBox>
                        <DescriptionBox>
                            <Typography variant='body1'>{task.description}</Typography>
                        </DescriptionBox>
                    </DetailsBox>
                </WholeContainer>
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
            </Container>
        </>
    )
}