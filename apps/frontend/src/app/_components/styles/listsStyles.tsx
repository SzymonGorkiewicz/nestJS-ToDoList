'use client'
import { styled, Box } from "@mui/material"
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';


export const StyledEditButton = styled(EditRoundedIcon)(({theme}) =>({
    color: theme.palette.secondary.light,
    fontSize: '30px',
    transition: 'transform 0.2s ease', 
    cursor: 'pointer', 
    '&:hover': {
      transform: 'scale(1.2)', 
    },
    
   
}))

export const StyledDeleteButton = styled(DeleteRoundedIcon)(({theme}) =>({
    color: theme.palette.secondary.light,
    fontSize: '30px',
    transition: 'transform 0.2s ease', 
    cursor: 'pointer', 
    '&:hover': {
      transform: 'scale(1.2)', 
    },
    
   
}))

export const ActionsBox = styled(Box)({
    display: 'none',
    maxWidth: 'inherit',
    maxHeight: 'inherit',
    gap: 8, 
});

export const TileContainer = styled(Box)(({ theme }) => ({
    width: '270px',
    height: '270px',
    borderRadius: 12,
    display: 'flex',
    transition: 'transform 0.2s ease', 
    flexDirection: 'row',
    '&:hover .actions':{
        display: 'flex',
        
    },
    '&:hover':{
        cursor: 'pointer',
        transform: 'scale(1.05)', 
        
    },
    backgroundColor: theme.palette.primary.dark,
    position: 'relative'
  }));

export const WholeContainer = styled(Box)(({ theme }) => ({
    display: 'grid',
    gridTemplateColumns: 'repeat(1, 1fr)', 
    gap: '32px',
    width: '100%',
    justifyItems: 'center',

    [theme.breakpoints.up('sm')]:{
        gridTemplateColumns: 'repeat(2,1fr)'
    },
    [theme.breakpoints.up('md')]:{
        gridTemplateColumns: 'repeat(3,1fr)'
    },
    [theme.breakpoints.up('lg')]:{
        gridTemplateColumns: 'repeat(4,1fr)'
    }
}));

export const HelperBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '10px',
    maxWidth: '100%'
}));

export const DescriptionBox = styled(Box)(({ theme }) => ({
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    WebkitLineClamp: 7,
    textOverflow: 'ellipsis',
    maxHeight: '70%',
    maxWidth: '90%',
    wordBreak: 'break-word',
    overflowWrap: 'break-word',
    whiteSpace: 'normal', 
    

}));


export const NameBox = styled(Box)(({ theme }) => ({
    flex: 2,
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 1,
    overflow: 'hidden',
    maxWidth: '60%',
    textOverflow: 'ellipsis',
    whiteSpace: 'normal',
    

}));

export const ListBox = styled(Box)(({theme}) =>({
    display:'flex',
    flexDirection: 'column',
    width:'100%',
    height: '100%',
    padding: '15px',

   
}))