import { Typography } from '@mui/material';
import CardContent from '@mui/material/CardContent';

import { StyledNullStateCard } from './NullState.styles';
import { NullStateProps } from './NullState.types';

const TITLE = 'No Data Available';
const DESCRIPTION =
    'There is nothing to display here at the moment. Try adding a new item or adjusting your filters.';

export const NullStateCard = ({
    title = TITLE,
    description = DESCRIPTION,
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
