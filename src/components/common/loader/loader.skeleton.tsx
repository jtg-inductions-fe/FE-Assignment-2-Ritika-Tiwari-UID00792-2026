import { FC } from 'react';

import {
    BaseSkeleton,
    CardBody,
    CardContainer,
    TextSkeleton,
} from './loader.style';

export const CardLoadingSkeleton: FC = () => (
        <CardContainer>
            {/* Card skeleton showing the food items or restaurant cards */}
            <BaseSkeleton
                variant="rectangular"
                width="100%"
                height={140}
                animation="wave"
            />

            {/* 2. Card Content Text Block stacked directly below */}
            <CardBody>
                {/* Title */}
                <TextSkeleton
                    variant="text"
                    width="80%"
                    height={20}
                    animation="wave"
                />

                {/* Description */}
                <TextSkeleton
                    variant="text"
                    width="100%"
                    height={14}
                    animation="wave"
                />
            </CardBody>
        </CardContainer>
    );
