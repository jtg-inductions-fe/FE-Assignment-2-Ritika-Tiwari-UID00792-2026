import { Box, styled } from '@mui/material';

export const OuterContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'center',
    justifyContent: 'center',
    gap: theme.spacing(1.6),
    marginBlock: theme.spacing(3.2),
    [theme.breakpoints.up('md')]: {
        flexDirection: 'row',
    },
}));

export const FilterContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'start',
    gap: theme.spacing(1.6),
    flexGrow: 2,
}));
