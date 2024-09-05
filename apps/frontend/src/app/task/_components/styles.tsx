import { Box, styled } from "@mui/material";


export const ButtonsBox = styled(Box)(({theme}) =>({
   display: 'flex',
   flexDirection: 'column',
   alignItems:'center',
   flex: 1,
   gap: 20

}))

export const DetailsBox = styled(Box)(({theme}) =>({
    flex: 8,
    display: 'flex',
    flexDirection:'column',
    gap: 20,
    backgroundColor: theme.palette.primary.dark,
    borderRadius: 12,
    padding: 10
}))

export const WholeContainer = styled(Box)(({theme})=>({
    display: 'flex',
    flexDirection: 'row',
    gap: theme.spacing(20),
    width: '100%',
    height: 'auto'
}))

export const EditBox = styled(Box)(({theme}) =>({
    flex: 4,
    marginTop: 12,
    backgroundColor: theme.palette.primary.dark,
    borderRadius: 12
}))

export const DeleteBox = styled(Box)(({theme}) =>({
    flex: 4,
    marginBottom: 12,
    backgroundColor: theme.palette.primary.dark,
    borderRadius: 12
}))
