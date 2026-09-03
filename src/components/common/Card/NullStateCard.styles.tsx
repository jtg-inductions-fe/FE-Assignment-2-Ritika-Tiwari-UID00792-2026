import { Card, styled } from '@mui/material';

/**Styled component used to style the Null state card. */
export const StyledNullStateCard = styled(Card)(({ theme }) => ({
    width: '100%',
    maxWidth: 500,
    margin: 'auto',
    display: 'flex',
    textAlign: 'center',
    backgroundColor: theme.palette.background.paper,
}));
