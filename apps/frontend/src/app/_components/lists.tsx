"use client";

import React, { useEffect, useRef, useState } from "react";
import { Typography, Container, Box } from "@mui/material";
import { useRouter } from "next/navigation";
import {
  ListBox,
  ActionsBox,
  WholeContainer,
  TileContainer,
  StyledEditButton,
  StyledDeleteButton,
  HelperBox,
  DescriptionBox,
  NameBox,
} from "./styles/listsStyles";
import DeleteList from "./deletelist";
import EditList from "./editlist";
import ListForm from "../addlist/_components/listForm";
import axios from "axios";
interface List {
  name: string;
  description: string;
  id: number;
}

const Lists: React.FC = () => {
  const user = JSON.parse(localStorage.getItem("user")!);
  const axiosClient = axios.create({
    baseURL: "http://localhost:3000/lists/",
    timeout: 1000,
    headers: { Authorization: `Bearer ${user.access_token}` },
  });
  const [lists, setLists] = useState<List[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);
  const [listToDelete, setListToDelete] = useState<number | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState<boolean>(false);
  const [listToEdit, setListToEdit] = useState<List | null>(null);
  const [seed, setSeed] = useState(1);
  const dragTile = useRef<number>(0);
  const draggedOverTile = useRef<number>(0);

  const handleDragSort = () => {
    const listClone = [...lists];
    const temp = listClone[dragTile.current];
    listClone[dragTile.current] = listClone[draggedOverTile.current];
    listClone[draggedOverTile.current] = temp;
    setLists(listClone);
  };

  const refreshLists = () => {
    setSeed((prevSeed) => prevSeed + 1);
  };

  const editButtonClicked = (list: List) => {
    setListToEdit(list);
    setEditDialogOpen(true);
  };

  const deleteButtonClicked = (listId: number) => {
    setListToDelete(listId);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (listToDelete !== null) {
      try {
        await axiosClient.delete(`${listToDelete}`);
        setLists((prev) => prev.filter((list) => list.id !== listToDelete));
        setListToDelete(null);
        setDeleteDialogOpen(false);
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  const handleDeleteCancel = () => {
    setListToDelete(null);
    setDeleteDialogOpen(false);
  };

  const handleEditConfirm = async (name: string, description: string) => {
    if (listToEdit) {
      try {
        await axiosClient.patch(`${listToEdit.id}`, { name, description });
        setLists((prev) =>
          prev.map((list) =>
            list.id === listToEdit.id ? { ...list, name, description } : list,
          ),
        );
        setListToEdit(null);
        setEditDialogOpen(false);
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  const handleEditCancel = () => {
    setListToEdit(null);
    setEditDialogOpen(false);
  };

  const showTasks = (list: List) => {
    router.push(`/list/${list.id}`);
  };

  useEffect(() => {
    const fetchLists = async () => {
      try {
        const response = await axiosClient.get(`${user.id}`);
        setLists(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchLists();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router, seed]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <Container>
      <WholeContainer>
        <ListForm onListCreated={refreshLists} />
        {lists.length === 0 ? (
          <Box sx={{ width: "100%" }}>
            <Typography variant="h2">Create your first To-do list</Typography>
          </Box>
        ) : (
          lists.map((list, index) => (
            <TileContainer
              key={list.id}
              draggable
              onDragStart={() => (dragTile.current = index)}
              onDragEnter={() => (draggedOverTile.current = index)}
              onDragEnd={handleDragSort}
              onDragOver={(e) => e.preventDefault()}
            >
              <ListBox className="listbox" onClick={() => showTasks(list)}>
                <HelperBox>
                  <NameBox>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: "bold",
                        wordWrap: "break-word",
                        flexGrow: 1,
                      }}
                    >
                      {list.name}
                    </Typography>
                  </NameBox>
                  <ActionsBox className="actions">
                    <StyledEditButton
                      onClick={(event) => {
                        event.stopPropagation();
                        editButtonClicked(list);
                      }}
                    >
                      edit
                    </StyledEditButton>
                    <StyledDeleteButton
                      onClick={(event) => {
                        event.stopPropagation();
                        deleteButtonClicked(list.id);
                      }}
                    >
                      delete
                    </StyledDeleteButton>
                  </ActionsBox>
                </HelperBox>
                <DescriptionBox>
                  <Typography>{list.description}</Typography>
                </DescriptionBox>
              </ListBox>
            </TileContainer>
          ))
        )}
      </WholeContainer>

      {deleteDialogOpen && (
        <DeleteList
          open={deleteDialogOpen}
          onConfirm={handleDeleteConfirm}
          onCancel={handleDeleteCancel}
        />
      )}
      {editDialogOpen && listToEdit && (
        <EditList
          open={editDialogOpen}
          initialName={listToEdit.name}
          initialDescription={listToEdit.description}
          onConfirm={handleEditConfirm}
          onCancel={handleEditCancel}
        />
      )}
    </Container>
  );
};

export default Lists;
