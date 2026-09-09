import { CardContent, Typography } from '@mui/material';

import { DESCRIPTION, TITLE } from './NullStateCard.constants';
import { StyledNullStateCard } from './NullStateCard.styles';
import { NullStateCardProps } from './NullStateCard.types';
/**
 * Null State component to show the Null State when data is not available.
 *
 * @param NullStateCardProps -  The configuration properties for the rendering Null State Card component.
 * @returns returns the JSX.Element
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
