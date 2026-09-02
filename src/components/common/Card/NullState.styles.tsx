import Card from '@mui/material/Card';
import { styled } from '@mui/material/styles';

// Styled NullState Card Component
export const StyledNullStateCard = styled(Card)(({ theme }) => ({
    width: '100%',
    maxWidth: 500,
    margin: 'auto',
    display: 'flex',
    gap: 3,
    textAlign: 'center',
    boxShadow: 'none',
    backgroundColor: theme.palette.background.paper,
}));
