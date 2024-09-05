import Navbar from "@/app/_components/navbar"
import { Button, Box, Container, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography } from "@mui/material";
import { useRouter, useParams } from "next/navigation"
import React, { useEffect, useState } from "react";
import { BackIcon, ButtonBox,StyledCheckBox, DetailsContainer, ListBox,  StyledIcon, Task, TaskBox } from "./styles";



interface List {
    id: number;
    name: string;
    description: string;
}

interface Task{
    title:string,
    description: string
    id:number
    completed:boolean
}

export default function ListViewForm(){
    const API_URL = "http://localhost:3000/";
    const params = useParams()
    const router = useRouter();
    const [openDialog, setOpen] = useState(false)
    const [errorMessage, setErrorMessage] = useState<string[]|null>(null)
    const [listDetails, setListDetails] = useState<List | null>(null);
    const [allTask, setAllTask] = useState<Task[] | null>([]);
    const [refreshKey, setRefreshKey] = useState<number>(0);
    const listID = parseInt(params.listid as string, 10);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        list: listID
    })
    

    useEffect(()=>{
        const user = JSON.parse(localStorage.getItem('user')!)
        console.log(user)
        const fetchListDetails = async (listID: number) => {
            
            try {
                const response = await fetch(`${API_URL}lists/get/${listID}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${user.access_token}`
                    },
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch task');
                }
                const listData = await response.json();
                setListDetails(listData)
            } catch (error) {
                console.error(error);
            }
        };
        fetchListDetails(listID)
    }, [])

    useEffect(() => {
        
        const fetchTasks = async () => {
            try {
                const user = JSON.parse(localStorage.getItem('user')!);
                const response = await fetch(`${API_URL}tasks/${listID}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${user.access_token}`,
                    },
                });
    
                if (!response.ok) {
                    const errorResponse = await response.json();
                    console.log(errorResponse.message);
                    return;
                }
                const result = await response.json();
                setAllTask(result);
            } catch (error) {
                console.error(error);
                setErrorMessage(["failed to fetch tasks"]);
            }
        };
    
        fetchTasks();
    }, [formData.list, refreshKey]);

    const SubmitTaskCreation = async (e: React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault()
        setErrorMessage(null)

        try {
            console.log(formData)
            const user = JSON.parse(localStorage.getItem('user')!)
            const response = await fetch(`${API_URL}tasks/create`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.access_token}`
                },
                body: JSON.stringify(formData)
            })

            if (!response.ok){
                const errorResponse = await response.json()
                setErrorMessage(errorResponse.message)
                return
            }
            const result = await response.json()
            console.log(result)
            setOpen(false)
            if (listDetails){
                setFormData({
                    title: '',
                    description: '',
                    list: listID
                })
            }
            setRefreshKey(prevKey => prevKey + 1)


        }catch(error){
            console.error(error)
            setErrorMessage(["failed to submit"])
        }
    }

    const taskDetails = (task:Task) =>{
        const taskId = task.id;
        router.push(`/task/${taskId}`);
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
            
        }));
    };

    const  handleCheckBoxChange = async (checked:boolean, taskID:number) => {
        console.log(checked)
        console.log(taskID)
        const user = JSON.parse(localStorage.getItem('user')!)
        
        const updatedCheckbox = {
            completed: checked,
            list: listID
        };

        console.log(updatedCheckbox)
        try {
            const response = await fetch(`${API_URL}tasks/${taskID}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.access_token}`
                },
                body: JSON.stringify(updatedCheckbox),
            });
    
            if (!response.ok) {
                throw new Error('Failed to update task');
            }
            const result = await response.json()
            console.log(result)
            setAllTask((prevTasks) =>
                prevTasks!.map((task) =>
                    task.id === taskID ? { ...task, completed: checked } : task
                )
            );
        } catch (error) {
            console.error(error);
        }
    }

    return(
        <>
            <Navbar />
            <BackIcon onClick={()=>router.push('/')}></BackIcon>
            <Container>
            
            <DetailsContainer>
                <ButtonBox onClick={()=>setOpen(true)}>
                    <StyledIcon ></StyledIcon>
                    <Typography variant="h5" component={'div'}>Add task</Typography>
                </ButtonBox>
                <Box>
                    {listDetails ? (
                        <ListBox>
                            <Typography variant="h4">{listDetails.name}</Typography>
                            <Typography variant="h6">{listDetails.description}</Typography>
                        </ListBox>
                    ) : (
                        <p>Fetching list details...</p>
                    )}
                    <TaskBox>
                        <Typography variant='h5'>Tasks:</Typography>
                        {allTask ? (
                            allTask.map((task) => (
                                <Task key={task.id} onClick={()=>taskDetails(task)}>
                                    <Typography variant="h6">{task.title}</Typography>
                                    <StyledCheckBox
                                        checked={task.completed}
                                        onClick={(e)=>{
                                            e.stopPropagation();
                                            // task.completed = !task.completed;
                                            handleCheckBoxChange(!task.completed, task.id)
                                            
                                        }}
                                        
                                        
                                    />
                                </Task>
                            ))
                        ) : (
                            <p>Fetching tasks...</p>
                        )}
                    </TaskBox>
                </Box>
                
            </DetailsContainer>


            <Dialog open={openDialog} onClose={()=> setOpen(false)}>
                <DialogTitle>Create Task</DialogTitle>
                <DialogContent>
                    <form onSubmit={SubmitTaskCreation}>
                        <TextField
                            onChange={handleChange}
                            name='title'
                            value={formData.title}
                            placeholder='Title'
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            onChange={handleChange}
                            name='description'
                            value={formData.description}
                            placeholder='Description'
                            fullWidth
                            margin="normal"
                        />
                        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                        <DialogActions>
                            <Button onClick={()=> setOpen(false)} color="primary">
                                Cancel
                            </Button>
                            <Button variant='contained' type="submit" color="primary">
                                Create
                            </Button>
                        </DialogActions>
                    </form>
                </DialogContent>
            </Dialog>
            </Container>
        </>
    )
}