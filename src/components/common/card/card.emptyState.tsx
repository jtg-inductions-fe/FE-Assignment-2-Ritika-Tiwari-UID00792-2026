import * as React from 'react';

import CardContent from '@mui/material/CardContent';

import {
    StyledDescription,
    StyledEmptyStateCard,
    StyledTitle,
} from './card.styles';
import EmptyStateProps from './card.types';

export const EmptyStateCard: React.FC<EmptyStateProps> = ({
    title = 'No Data Available',
    description = 'There is nothing to display here at the moment. Try adding a new item or adjusting your filters.',
}) => (
    <StyledEmptyStateCard variant="outlined">
        <CardContent>
            {/* Title */}
            <StyledTitle as="h2">{title}</StyledTitle>

            {/* Description */}
            <StyledDescription>{description}</StyledDescription>
        </CardContent>
    </StyledEmptyStateCard>
);
