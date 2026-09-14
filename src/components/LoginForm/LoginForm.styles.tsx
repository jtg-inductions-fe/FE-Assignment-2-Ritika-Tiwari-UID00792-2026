import { Box, styled } from '@mui/material';

export const StyledBoxInner = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing(2),
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2.4),
}));

export const LogoImage = styled('img')(({ theme }) => ({
    width: 32,
    borderRadius: theme.shape.borderRadius,
    objectFit: 'cover',
}));
