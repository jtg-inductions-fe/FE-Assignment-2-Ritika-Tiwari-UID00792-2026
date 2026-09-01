import { Box, styled, Typography } from '@mui/material';
import Button from '@mui/material/Button';

export const StyledBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '4rem',
    backgroundColor: theme.palette.background.default,
}));

export const StyledImage = styled('img')(({ theme }) => ({
    width: '100%',
    maxWidth: '400px',
    height: 'auto',
    borderRadius: theme.shape.borderRadius,
    objectFit: 'cover',
}));

export const StyledDescription = styled(Typography)(({ theme }) => ({
    ...theme.typography.body2,
    color: theme.palette.text.secondary,
    textAlign: 'center',
}));

export const StyledButton = styled(Button)(({ theme }) => ({
    ...theme.typography.button,
    fontWeight: theme.typography.fontWeightBold || 600,
    boxShadow: theme.shadows[2],
    padding: theme.spacing(2, 4),
}));
