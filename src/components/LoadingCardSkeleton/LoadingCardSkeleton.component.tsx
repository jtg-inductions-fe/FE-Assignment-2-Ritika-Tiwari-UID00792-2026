import { Skeleton, Typography } from '@mui/material';

import {
    BaseSkeleton,
    CardBody,
    CardContainer,
} from './LoadingCardSkeleton.styles';
import { LoadingCardSkeletonProps } from './LoadingCardSkeleton.types';

export const LoadingCardSkeleton = ({
    variant = 'column',
}: LoadingCardSkeletonProps) => (
    <CardContainer variant={variant}>
        <BaseSkeleton
            variant="rectangular"
            layoutVariant={variant}
            height={140}
            animation="wave"
        />

        <CardBody>
            <Typography variant="h4" component="div">
                <Skeleton
                    variant="text"
                    width="80%"
                    height={50}
                    animation="wave"
                />
            </Typography>
            <Typography variant="body2" component="div">
                <Skeleton
                    variant="text"
                    width="100%"
                    height={24}
                    animation="wave"
                />
            </Typography>
            <Typography variant="body2" component="div">
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
