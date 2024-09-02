'use client'
import { styled, Box } from "@mui/material"


export const ListBox = styled(Box)(({theme}) =>({
    alignItems: 'center',
    width: '20vw',
    height: '5vh',
    fontSize: 15,
    color: theme.palette.text.primary,
    marginBottom: 12,
    padding: 15,
    alignContent: 'center'
   
}))

export const ActionsBox = styled(Box)({
    display: 'none',
    maxWidth: 'inherit',
    maxHeight: 'inherit',
    gap: 8, 
});

export const WholeContainer = styled(Box)(({theme}) =>({
    display:'flex',
    flexDirection: 'row',
    width: '50vw',
    border: `2px solid transparent`,
    '&:hover':{
        border: `2px solid ${theme.palette.primary.main}`,
        borderRadius: 12
    },
    '&:hover .actions':{
        display: "flex"
    },
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12
}));