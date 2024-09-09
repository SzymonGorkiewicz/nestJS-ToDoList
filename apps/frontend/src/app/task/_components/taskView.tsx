import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import { BackIcon } from "@/app/list/_components/styles";
import {
  ButtonsBox,
  DescriptionBox,
  DetailsBox,
  IconBox,
  WholeContainer,
} from "./styles";
import {
  StyledEditButton,
  StyledDeleteButton,
} from "@/app/_components/styles/listsStyles";
import axios from "axios";
interface List {
  id: number;
}

interface Task {
  title: string;
  description: string;
  id: number;
  list: List;
}

export default function TaskView() {
  const token = JSON.parse(localStorage.getItem("user")!).access_token;
  const axiosClient = axios.create({
    baseURL: "http://localhost:3000/",
    timeout: 1000,
    headers: { Authorization: `Bearer ${token}` },
  });
  const [task, setTask] = useState<Task | null>(null);
  const params = useParams();
  const { push } = useRouter();
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [editedTask, setEditedTask] = useState<Task | null>(null);
  const taskId = parseInt(params.taskid as string, 10);

  useEffect(() => {
    const fetchTask = async (taskId: number) => {
      try {
        const response = await axiosClient.get(`tasks/get/${taskId}`);
        setTask(response.data);
        setEditedTask(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchTask(taskId);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const deleteTask = async (taskId: number) => {
    try {
      await axiosClient.delete(`tasks/${taskId}`);
      setOpenDeleteDialog(false);
      if (task) {
        push(`/list/${task.list.id}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const editTask = async (task: Task) => {
    const updatedTask = {
      title: task.title,
      description: task.description,
      list: task.list.id,
    };

    try {
      await axiosClient.patch(`tasks/${taskId}`, updatedTask);
      setOpenEditDialog(false);
      setTask(task);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditTaskChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (editedTask) {
      setEditedTask((prev) => ({
        ...prev!,
        [name]: value,
      }));
    }
  };

  if (!task) return <div>Loading...</div>;

  return (
    <>
      {" "}
      <BackIcon onClick={() => push(`/list/${task.list.id}`)}></BackIcon>
      <Container>
        <WholeContainer>
          <ButtonsBox>
            <IconBox>
              <StyledEditButton
                sx={{ fontSize: 120 }}
                onClick={() => setOpenEditDialog(true)}
              >
                edit
              </StyledEditButton>
            </IconBox>
            <IconBox>
              <StyledDeleteButton
                sx={{ fontSize: 120 }}
                onClick={() => setOpenDeleteDialog(true)}
              >
                delete
              </StyledDeleteButton>
            </IconBox>
          </ButtonsBox>
          <DetailsBox>
            <DescriptionBox>
              <Typography variant="h3">{task.title}</Typography>
            </DescriptionBox>
            <DescriptionBox>
              <Typography variant="body1">{task.description}</Typography>
            </DescriptionBox>
          </DetailsBox>
        </WholeContainer>
        <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
          <DialogTitle>Edit Task</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Title"
              type="text"
              fullWidth
              variant="outlined"
              name="title"
              value={editedTask?.title || ""}
              onChange={handleEditTaskChange}
            />
            <TextField
              margin="dense"
              label="Description"
              type="text"
              fullWidth
              variant="outlined"
              name="description"
              value={editedTask?.description || ""}
              onChange={handleEditTaskChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenEditDialog(false)}>Cancel</Button>
            <Button onClick={() => editedTask && editTask(editedTask)}>
              Save
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={openDeleteDialog}
          onClose={() => setOpenDeleteDialog(false)}
        >
          <DialogTitle>Confirm Delete</DialogTitle>
          <DialogContent>
            <Typography>Are you sure you want to delete this task?</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDeleteDialog(false)}>Cancel</Button>
            <Button onClick={() => deleteTask(task.id)} color="error">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </>
  );
}
