import { Box, styled } from "@mui/material";

export const ButtonsBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  flex: 1,
  gap: 20,
  "@media (max-width: 700px)": {
    flexDirection: "row",
    justifyContent: "center",
  },
}));

export const DetailsBox = styled(Box)(({ theme }) => ({
  flex: 8,
  display: "flex",
  flexDirection: "column",
  gap: 20,
  backgroundColor: theme.palette.primary.dark,
  borderRadius: 12,
  padding: 10,
}));

export const DescriptionBox = styled(Box)(({ theme }) => ({
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

export const WholeContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  gap: theme.spacing(20),
  width: "100%",
  height: "auto",
  "@media (max-width: 700px)": {
    flexDirection: "column",
    gap: theme.spacing(5),
  },
}));

export const IconBox = styled(Box)(({ theme }) => ({
  flex: 4,
  marginTop: 12,
  backgroundColor: theme.palette.primary.dark,
  borderRadius: 12,
  maxHeight: "130px",
  maxWidth: "150px",
  "@media (max-width: 700px)": {
    display: "flex",
    justifyContent: "center",
    alighItems: "center",
    maxHeight: "130px",
    maxWidth: "120px",
    marginBottom: 0,
  },
}));
