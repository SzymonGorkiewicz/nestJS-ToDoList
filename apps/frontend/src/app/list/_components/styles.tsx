'use client'
import { styled, Box, Checkbox } from "@mui/material"
import AddBoxRoundedIcon from '@mui/icons-material/AddBoxRounded';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';

export const ListBox = styled(Box)(({theme}) =>({
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    height: '20vh',
    backgroundColor: theme.palette.primary.dark,
    borderRadius: 12,
    padding: 10,
    
}))

export const StyledCheckBox = styled(Checkbox)(({theme}) =>({
    size: 'small',
    color: theme.palette.primary.main,
    '&.Mui-checked':{
        color:theme.palette.secondary.main
    }
}))

export const Task = styled(Box)(({theme}) =>({
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: 12,
    marginBottom: 20,
    transition: 'transform 0.2s ease', 
    borderBottom: `3px solid ${theme.palette.primary.main}`,
    '&:hover':{
        cursor: 'pointer',
        borderBottom: `3px solid ${theme.palette.secondary.main}`,
        transform: 'scale(1.02)'
    },
    padding: 10
   
}))

export const DetailsContainer = styled(Box)(({theme}) =>({
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    gap: 150
   
}))

export const TaskBox = styled(Box)(({theme}) =>({
    backgroundColor: theme.palette.primary.dark,
    borderRadius: 12,
    padding: 20,
    marginTop: 20
   
}))

export const StyledIcon = styled(AddBoxRoundedIcon)(({theme}) =>({
    fontSize: '200px',
    color: theme.palette.background.default,

}))


export const BackIcon = styled(ArrowBackIosNewRoundedIcon)(({theme}) =>({
    marginLeft:50,
    fontSize: '50px',
    transition: 'transform 0.2s ease',
    color: theme.palette.primary.dark,
    '&:hover':{
        cursor: 'pointer',
        transform: 'scale(1.2)'
    }

}))

export const ButtonBox = styled(Box)(({theme}) =>({
    height: '13vw',
    width: '10vw',
    display:'flex',
    transition: 'transform 0.2s ease', 
    flexDirection: 'column',
    alignItems:'center',
    backgroundColor: theme.palette.primary.dark,
    borderRadius:12,
    '&:hover':{
        cursor: 'pointer',
        transform: 'scale(1.05)'
    }
}))

