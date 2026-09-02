import { CardContent, Typography } from '@mui/material';

import { StyledNullStateCard } from './NullState.styles';
import { NullStateProps } from './NullState.types';

// Constant for the default value of title and description
const TITLE = 'No Data Available';
const DESCRIPTION =
    'There is nothing to display here at the moment. Try adding a new item or adjusting your filters.';

/**
 * Null State component to show the Null State when data is not available.
 *
 * @param NullStateProps -  props define the types of title and description passed to the snackbar component.
 */
export const NullStateCard = ({
    title = TITLE,
    description = DESCRIPTION,
}: NullStateProps) => (
    <StyledNullStateCard variant="outlined">
        <CardContent>
            {/* Title */}
            <Typography
                component="h6"
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
