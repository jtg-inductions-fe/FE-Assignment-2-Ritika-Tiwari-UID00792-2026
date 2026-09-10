import { Box, Button, styled } from '@mui/material';

export const OuterContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'center',
    justifyContent: 'center',
    gap: theme.spacing(1.6),
    marginTop: theme.spacing(3.2),
    [theme.breakpoints.up('md')]: {
        flexDirection: 'row',
    },
}));
export const FilterContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing(1.6),
    width: '100%',
    [theme.breakpoints.up('md')]: {
        borderWidth: 2,
        width: '40%',
    },
}));

export const GrowingButton = styled(Button)({
    minWidth: '45%',
});
