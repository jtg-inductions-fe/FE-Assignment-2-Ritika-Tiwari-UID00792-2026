import { Card, styled } from '@mui/material';

/**Styled component used to style the Null state card. */
export const StyledNullStateCard = styled(Card)(({ theme }) => ({
    margin: 'auto',
    display: 'flex',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.palette.background.paper,
}));
