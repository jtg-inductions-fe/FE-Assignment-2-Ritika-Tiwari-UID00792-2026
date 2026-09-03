import { CardContent, Typography } from '@mui/material';

import { StyledNullStateCard } from './NullStateCard.styles';
import { NullStateCardProps } from './NullStateCard.types';

// Constant for the default value of title and description
const TITLE = 'No Data Available';
const DESCRIPTION =
    'There is nothing to display here at the moment. Try adding a new item or adjusting your filters.';

/**
 * Null State component to show the Null State when data is not available.
 *
 * @param NullStateCardProps -  The configuration properties for the rendering Null State Card component.
 * @returns returns the JSX.Element
 * @component Card
 */
export const NullStateCard = ({
    title = TITLE,
    description = DESCRIPTION,
}: NullStateCardProps) => (
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
