"use client";
import { styled, Box, Checkbox } from "@mui/material";
import AddBoxRoundedIcon from "@mui/icons-material/AddBoxRounded";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";

export const ListBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  height: "70%",
  backgroundColor: theme.palette.primary.dark,
  borderRadius: 12,
  padding: 10,
  gap: 15,
}));

export const DescriptionBox = styled(Box)(({ theme }) => ({
  flex: 7,
  overflowY: "auto",
  overflowWrap: "break-word",
  wordBreak: "break-word",
  whiteSpace: "normal",
  "&::-webkit-scrollbar": {
    width: "15px",
  },
  "&::-webkit-scrollbar-track": {
    background: theme.palette.primary.main,
    borderRadius: "8px",
  },
  "&::-webkit-scrollbar-thumb": {
    background: theme.palette.secondary.main,
    borderRadius: "8px",
  },
}));

export const TitleBox = styled(Box)(({ theme }) => ({
  flex: 1,
}));

export const StyledCheckBox = styled(Checkbox)(({ theme }) => ({
  size: "small",
  color: theme.palette.primary.main,
  "&.Mui-checked": {
    color: theme.palette.secondary.main,
  },
}));

export const Task = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  marginTop: 12,
  marginBottom: 20,
  transition: "transform 0.2s ease",
  borderBottom: `3px solid ${theme.palette.primary.main}`,
  "&:hover": {
    cursor: "pointer",
    borderBottom: `3px solid ${theme.palette.secondary.main}`,
    transform: "scale(1.02)",
  },
  padding: 10,
}));

export const DetailsContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  width: "100%",
  gap: 150,
  "@media (max-width: 700px)": {
    gap: 50,
    flexDirection: "column",
  },
  "@media (max-width: 600px)": {
    gap: 20,
  },
}));

export const TaskBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary.dark,
  borderRadius: 12,
  padding: 20,
  marginTop: 20,
}));

export const StyledIcon = styled(AddBoxRoundedIcon)(({ theme }) => ({
  fontSize: "200px",
  color: theme.palette.background.default,
}));

export const BackIcon = styled(ArrowBackIosNewRoundedIcon)(({ theme }) => ({
  marginLeft: 50,
  fontSize: "50px",
  transition: "transform 0.2s ease",
  color: theme.palette.primary.dark,
  "&:hover": {
    cursor: "pointer",
    transform: "scale(1.2)",
  },
}));

export const ButtonBox = styled(Box)(({ theme }) => ({
  height: "250px",
  width: "200px",
  display: "flex",
  transition: "transform 0.2s ease",
  flexDirection: "column",
  alignItems: "center",
  backgroundColor: theme.palette.primary.dark,
  borderRadius: 12,
  "&:hover": {
    cursor: "pointer",
    transform: "scale(1.05)",
  },
  flex: 1,
  minHeight: "250px",
  minWidth: "180px",
  marginTop: 20,
  "@media (max-width: 700px)": {
    minHeight: "250px",
    minWidth: "180px",
    margin: "0 auto",
  },
}));
