import { styled, Typography } from "@mui/material";
import { Button, Box, Link } from '@mui/material';

export const StyledBox = styled(Box)({
    width: '100%',
    display: 'flex',
    alignItems: 'center'
})

export const LogoutButton = styled(Button)(({theme}) =>({
    backgroundColor: theme.palette.secondary.main,
    '&:hover': {
        backgroundColor: theme.palette.secondary.dark,
    },
    fontSize: 15,
    color: theme.palette.text.primary,
    fontWeight: "600",
    alignSelf: 'center'
   
}))

export const StyledLink = styled(Link)(({theme}) =>({
    fontSize: 18,
    color: theme.palette.text.secondary,
    fontWeight: "600",
    alignSelf: 'center',
    marginLeft: 20,
    cursor: 'pointer'
   
}))

export const StyledTypography = styled(Typography)(({theme}) =>({
    fontSize: 20,
    color: theme.palette.text.primary,
    fontWeight: "bold",
    alignSelf: 'center'
   
}))