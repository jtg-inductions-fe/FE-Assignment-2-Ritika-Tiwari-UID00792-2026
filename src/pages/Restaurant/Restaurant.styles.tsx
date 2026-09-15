import { Box, styled } from '@mui/material';

export const OuterContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'center',
    justifyContent: 'center',
    gap: theme.spacing(4),
    marginBlock: theme.spacing(8),
    [theme.breakpoints.up('md')]: {
        flexDirection: 'row',
    },
}));

export const FilterContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'start',
    gap: theme.spacing(4),
}));
