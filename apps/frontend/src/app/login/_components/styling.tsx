import { styled, Typography } from "@mui/material";
import { Button, Box, TextField, Link } from '@mui/material';

export const StyledBox = styled(Box)({
    width: '100vw',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    marginTop: 100,
    
})

export const StyledTextField = styled(TextField)({
    width: '13vw',
   
})

export const StyledTypography = styled(Typography)(({theme}) =>({
    color: theme.palette.text.secondary,
    marginBottom: 20,
   
}))

export const StyledErrors = styled(Typography)(({theme}) =>({
    marginTop: 10,
    color: theme.palette.error.main,
   
}))

export const StyledLink = styled(Link)(({theme}) =>({
    color: theme.palette.primary.dark,
    cursor: 'pointer',
    
   
}))


export const SecondaryBox = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '20vw',
    height: 'auto',
    gap: 15,
    boxShadow: '0 10px 30px 3px rgba(0, 0, 0, 0.3)',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
})

export const StyledButton = styled(Button)(({theme}) => ({
    marginTop: 30,
    marginBottom: 20,
    paddingTop: 10,
    paddingBottom: 10,
    fontSize: 15,
    color: theme.palette.text.primary,
    fontWeight: "600",
    backgroundColor: theme.palette.primary.main,
    '&:hover': {
        backgroundColor: theme.palette.primary.dark,
    },
    width: '15vw'
}))

export const SignInBox = styled(Box)(({theme}) =>({
    backgroundColor: theme.palette.primary.main,
    width: '100%',
    justifyContent: 'center',
    display: 'flex',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    paddingTop: 12,
    paddingBottom: 12,
    marginBottom: 40,

}));