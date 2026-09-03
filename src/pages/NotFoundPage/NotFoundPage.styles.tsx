import { Box, styled } from '@mui/material';

/** Styling of the Box containing the fallback UI elements. */
export const StyledBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '4rem',
    backgroundColor: theme.palette.background.default,
}));

/** Styling of image component used in the fallback page. */
export const StyledImage = styled('img')(({ theme }) => ({
    width: '100%',
    maxWidth: '400px',
    height: 'auto',
    borderRadius: theme.shape.borderRadius,
    objectFit: 'cover',
}));
