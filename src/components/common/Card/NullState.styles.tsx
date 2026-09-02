import { Card, styled } from '@mui/material';

export const StyledNullStateCard = styled(Card)(({ theme }) => ({
    width: '100%',
    maxWidth: 500,
    margin: 'auto',
    display: 'flex',
    textAlign: 'center',
    backgroundColor: theme.palette.background.paper,
}));
