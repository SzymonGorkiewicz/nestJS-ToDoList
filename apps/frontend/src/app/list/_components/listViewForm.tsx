import Navbar from "@/app/_components/navbar"
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation"
import React, { useEffect, useState } from "react";


interface List {
    id: number;
    name: string;
    description: string;
}

interface Task{
    title:string,
    description: string
    id:number
}

export default function ListViewForm(){
    const API_URL = "http://localhost:3000/tasks";
    const searchParams = useSearchParams();
    const router = useRouter();
    const [openDialog, setOpen] = useState(false)
    const [errorMessage, setErrorMessage] = useState<string[]|null>(null)
    const [listDetails, setListDetails] = useState<List | null>(null);
    const [allTask, setAllTask] = useState<Task[] | null>([]);
    const [refreshKey, setRefreshKey] = useState<number>(0);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        list: 0
    })
    useEffect(()=>{
        const listParam = searchParams.get("list")
        if (listParam) {
            const parsedList = JSON.parse(decodeURIComponent(listParam));
            setListDetails(parsedList);

            setFormData((prevData) => ({
                ...prevData,
                list: parsedList.id 
            }));
            
        }
    }, [searchParams])

    useEffect(() => {
        if (formData.list === 0) return; 
    
        const fetchTasks = async () => {
            try {
                const user = JSON.parse(localStorage.getItem('user')!);
                const response = await fetch(`${API_URL}/${formData.list}`, {
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

    const SubmitListCreation = async (e: React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault()
        setErrorMessage(null)

        try {
            console.log(formData)
            const user = JSON.parse(localStorage.getItem('user')!)
            const response = await fetch(`${API_URL}/create`,{
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
                    list: listDetails.id
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

    return(
        <>
            <Navbar />
            <p>List Details</p>
            <Button variant="contained" onClick={()=>setOpen(true)}>create task</Button>
            {listDetails ? (
                <div>
                    <h2>{listDetails.name}</h2>
                    <p>{listDetails.description}</p>
                </div>
            ) : (
                <p>Loading...</p>
            )}
            {allTask ? (
                allTask.map((task) => (
                    <div key={task.id} onClick={()=>taskDetails(task)}>
                        <p>{task.title} {task.description}</p>
                    </div>
                ))
            ) : (
                <p>Ładowanie</p>
            )}



            <Dialog open={openDialog} onClose={()=> setOpen(false)}>
                <DialogTitle>Create Task</DialogTitle>
                <DialogContent>
                    <form onSubmit={SubmitListCreation}>
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
        </>
    )
}