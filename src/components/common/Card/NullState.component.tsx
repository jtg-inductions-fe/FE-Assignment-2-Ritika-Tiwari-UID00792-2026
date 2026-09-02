import CardContent from '@mui/material/CardContent';
import { StyledNullStateCard } from './NullState.styles';
import { NullStateProps } from './NullState.types';
import { Typography } from '@mui/material';

/**
 * Null State Card Component
 */
export const NullStateCard = ({
    title = 'No Data Available',
    description = 'There is nothing to display here at the moment. Try adding a new item or adjusting your filters.',
}: NullStateProps) => (
    <StyledNullStateCard variant="outlined">
        <CardContent>
            {/* Title */}
            <Typography
                component="span"
                variant="h6"
                color="text.primary"
                gutterBottom
            >
                {title}
            </Typography>

            {/* Description */}
            <Typography variant="body2" color="text.secondary">
                {description}
            </Typography>
        </CardContent>
    </StyledNullStateCard>
);
