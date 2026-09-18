import { Box, CardMedia, styled } from '@mui/material';

export const StyledCardMedia = styled(CardMedia)({
    width: 100,
    height: 50,
    objectFit: 'cover',
}) as typeof CardMedia;

export const ActionWrapper = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.background.default,
    paddingBlock: theme.spacing(4),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'end',
    borderTop: `1px solid ${theme.palette.divider}`,
}));

export const EmptyCart = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    boxShadow: theme.shadows[4],
    padding: theme.spacing(8),
}));
