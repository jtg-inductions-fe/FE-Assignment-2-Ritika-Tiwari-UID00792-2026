import { Card, styled } from '@mui/material';

/**Styled component used to style the Null state card. */
export const StyledNullStateCard = styled(Card)(({ theme }) => ({
    width:'100%',
    margin: 'auto',
    display: 'flex',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf:'center',
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
}));
