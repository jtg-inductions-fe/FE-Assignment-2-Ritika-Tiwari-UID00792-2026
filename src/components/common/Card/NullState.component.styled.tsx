import Card from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

// Styled NullState Card Component
export const StyledNullStateCard = styled(Card)(({ theme }) => ({
    width: '100%',
    maxWidth: 500,
    margin: 'auto',
    textAlign: 'center',
    boxShadow: 'none',
    backgroundColor: theme.palette.background.paper,
}));

// Styled title of NullState Card Component
export const StyledTitle = styled(Typography)(({ theme }) => ({
    ...theme.typography.h6,
    fontWeight: theme.typography.fontWeightBold || 600,
}));

// Styled description of NullState Card Component
export const StyledDescription = styled(Typography)(({ theme }) => ({
    ...theme.typography.body2,
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(3),
}));
