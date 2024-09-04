'use client'
import { styled, Box } from "@mui/material"
import AddBoxRoundedIcon from '@mui/icons-material/AddBoxRounded';


export const AddIconStyled = styled(AddBoxRoundedIcon)(({theme}) =>({
    width: 'inherit',
    height: 'inherit',
    color: theme.palette.primary.dark,
    borderRadius:30,
}))

export const IconBox = styled(Box)(({theme}) =>({
    width: '270px',
    height: '270px',
    transition: 'transform 0.2s ease', 
    cursor: 'pointer', 
    '&:hover': {
      transform: 'scale(1.05)', 
    },
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    backgroundColor: theme.palette.primary.main,
   
}))