import { Box, styled } from '@mui/material';

import { HEADER_HEIGHT } from '@constant';

/** Styling of the Box containing the fallback UI elements. */
export const StyledBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: `calc(100vh - ${HEADER_HEIGHT}px)`,
    gap: theme.spacing(8),
    backgroundColor: theme.palette.background.default,
}));

/** Styling of image component used in the fallback page. */
export const StyledImage = styled('img')(({ theme }) => ({
    width: '100%',
    maxWidth: 400,
    borderRadius: theme.shape.borderRadius,
    objectFit: 'cover',
}));
