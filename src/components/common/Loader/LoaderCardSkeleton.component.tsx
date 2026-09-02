import { Skeleton, Typography } from '@mui/material';

import {
    BaseSkeleton,
    CardBody,
    CardContainer,
} from './LoaderCardSkeleton.styles';

export const LoadingCardLoadingSkeleton = () => (
    <CardContainer>
        {/* Card skeleton showing the food items or restaurant cards */}
        <BaseSkeleton
            variant="rectangular"
            width="100%"
            height={140}
            animation="wave"
        />

        {/* Card Content Text Block stacked directly below */}
        <CardBody>
            {/* Title */}
            <Typography variant="h4">
                <Skeleton
                    variant="text"
                    width="80%"
                    height={50}
                    animation="wave"
                />
            </Typography>

            {/* Description */}
            <Typography variant="body2">
                <Skeleton
                    variant="text"
                    width="100%"
                    height={24}
                    animation="wave"
                />
            </Typography>
            <Typography variant="body2">
                <Skeleton
                    variant="text"
                    width="100%"
                    height={50}
                    animation="wave"
                />
            </Typography>
        </CardBody>
    </CardContainer>
);
