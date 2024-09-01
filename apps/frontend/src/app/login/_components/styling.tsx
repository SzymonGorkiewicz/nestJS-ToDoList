import { styled } from "@mui/material";
import { Button, Box, TextField } from '@mui/material';
import { customtheme } from "@/app/_components/theme";

export const StyledBox = styled(Box)({
    width: '100vw',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    marginTop: 200,
    
})

export const StyledTextField = styled(TextField)({
    width: '15vw'
})


export const SecondaryBox = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '25vw',
    height: 'auto',
    gap: 15,
    boxShadow: '0 10px 30px 3px rgba(0, 0, 0, 0.3)',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
})

export const StyledButton = styled(Button)({
    marginTop: 30,
    marginBottom: 50,
    paddingTop: 10,
    paddingBottom: 10,
    fontSize: 15,
    color: 'black',
    fontWeight: "500",
    backgroundColor: 'lightgreen',
    '&:hover': {
        backgroundColor: 'green'
    },
    width: '20vw'
})

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