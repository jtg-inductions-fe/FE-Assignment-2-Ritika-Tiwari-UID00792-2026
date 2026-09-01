import * as React from 'react';
import CardContent from '@mui/material/CardContent';
import {
    StyledDescription,
    StyledNullStateCard,
    StyledTitle,
} from './NullState.component.styled';
import { NullStateProps } from './NullState.types';

/**
 * Null State Card Component
 */
export const NullStateCard: React.FC<NullStateProps> = ({
    title = 'No Data Available',
    description = 'There is nothing to display here at the moment. Try adding a new item or adjusting your filters.',
}) => (
    <StyledNullStateCard variant="outlined">
        <CardContent>
            {/* Title */}
            <StyledTitle as="h2">{title}</StyledTitle>

            {/* Description */}
            <StyledDescription>{description}</StyledDescription>
        </CardContent>
    </StyledNullStateCard>
);
