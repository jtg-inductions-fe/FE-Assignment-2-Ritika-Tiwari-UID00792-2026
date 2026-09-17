import { Box, styled } from '@mui/material';

export const StyledBox = styled(Box)(({ theme }) => ({
    width: '100%',
    position: 'fixed',
    bottom: 0,
    backgroundColor: theme.palette.primary.dark,
    padding: theme.spacing(4),
}));
