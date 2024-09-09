import Navbar from "@/app/_components/navbar";
import {
  Button,
  Box,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import { useRouter, useParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import {
  BackIcon,
  ButtonBox,
  StyledCheckBox,
  DetailsContainer,
  ListBox,
  StyledIcon,
  Task,
  TaskBox,
  DescriptionBox,
  TitleBox,
} from "./styles";
import axios from "axios";

interface List {
  id: number;
  name: string;
  description: string;
}

interface Task {
  title: string;
  description: string;
  id: number;
  completed: boolean;
}

export default function ListViewForm() {
  const token = JSON.parse(localStorage.getItem("user")!).access_token;
  const axiosClient = axios.create({
    baseURL: "http://localhost:3000/",
    timeout: 1000,
    headers: { Authorization: `Bearer ${token}` },
  });
  const params = useParams();
  const router = useRouter();
  const [openDialog, setOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string[] | null>(null);
  const [listDetails, setListDetails] = useState<List | null>(null);
  const [allTask, setAllTask] = useState<Task[] | null>([]);
  const [refreshKey, setRefreshKey] = useState<number>(0);
  const listID = parseInt(params.listid as string, 10);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    list: listID,
  });
  const dragTile = useRef<number>(0);
  const draggedOverTile = useRef<number>(0);

  const handleDragSort = () => {
    const taskClone = [...allTask!];
    const temp = taskClone[dragTile.current];
    taskClone[dragTile.current] = taskClone[draggedOverTile.current];
    taskClone[draggedOverTile.current] = temp;
    setAllTask(taskClone);
  };

  useEffect(() => {
    const fetchListDetails = async (listID: number) => {
      try {
        const response = await axiosClient.get(`lists/get/${listID}`);
        setListDetails(response.data);
      } catch (error) {
        throw new Error(`${error}`);
      }
    };
    fetchListDetails(listID);
  }, []);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axiosClient.get(`tasks/${listID}`);
        setAllTask(response.data);
      } catch (error) {
        setErrorMessage([`${error}`]); // tu poprawic moze zeby to nie byla lista
      }
    };
    fetchTasks();
  }, [formData.list, refreshKey]);

  const SubmitTaskCreation = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(null);

    try {
      await axiosClient.post(`tasks/create`, formData);
      setOpen(false);
      if (listDetails) {
        setFormData({
          title: "",
          description: "",
          list: listID,
        });
      }
      setRefreshKey((prevKey) => prevKey + 1);
    } catch (error) {
      setErrorMessage([`Failed to create task`]);
    }
  };

  const taskDetails = (task: Task) => {
    const taskId = task.id;
    router.push(`/task/${taskId}`);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCheckBoxChange = async (checked: boolean, taskID: number) => {
    const updatedCheckbox = {
      completed: checked,
      list: listID,
    };

    try {
      await axiosClient.patch(`tasks/${taskID}`, updatedCheckbox);
      setAllTask((prevTasks) =>
        prevTasks!.map((task) =>
          task.id === taskID ? { ...task, completed: checked } : task,
        ),
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Navbar />
      <BackIcon onClick={() => router.push("/")}></BackIcon>
      <Container>
        <DetailsContainer>
          <ButtonBox onClick={() => setOpen(true)}>
            <StyledIcon></StyledIcon>
            <Typography variant="h5" component={"div"}>
              Add task
            </Typography>
          </ButtonBox>
          <Box sx={{ flex: 5 }}>
            {listDetails ? (
              <ListBox>
                <TitleBox sx={{ flex: 1 }}>
                  <Typography variant="h4">{listDetails.name}</Typography>
                </TitleBox>
                <DescriptionBox>
                  <Typography variant="h6">
                    {listDetails.description}
                  </Typography>
                </DescriptionBox>
              </ListBox>
            ) : (
              <p>Fetching list details...</p>
            )}
            <TaskBox>
              <Typography variant="h5">Tasks:</Typography>
              {allTask ? (
                allTask.map((task, index) => (
                  <Task
                    key={task.id}
                    onClick={() => taskDetails(task)}
                    draggable
                    onDragStart={() => (dragTile.current = index)}
                    onDragEnter={() => (draggedOverTile.current = index)}
                    onDragEnd={handleDragSort}
                    onDragOver={(e) => e.preventDefault()}
                  >
                    <Typography variant="h6">{task.title}</Typography>
                    <StyledCheckBox
                      checked={task.completed}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCheckBoxChange(!task.completed, task.id);
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

        <Dialog open={openDialog} onClose={() => setOpen(false)}>
          <DialogTitle>Create Task</DialogTitle>
          <DialogContent>
            <form onSubmit={SubmitTaskCreation}>
              <TextField
                onChange={handleChange}
                name="title"
                value={formData.title}
                placeholder="Title"
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
                <Button onClick={() => setOpen(false)} color="primary">
                  Cancel
                </Button>
                <Button variant="contained" type="submit" color="primary">
                  Create
                </Button>
              </DialogActions>
            </form>
          </DialogContent>
        </Dialog>
      </Container>
    </>
  );
}
