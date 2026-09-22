import { useState } from 'react';
import React from 'react';

import { Box, Button, CardActionArea, Typography } from '@mui/material';

import closedTag from '@assets/images/closed-restaurant.webp';
import FALLBACK_IMAGE from '@assets/images/fallback-image.webp';
import nonVegIndicator from '@assets/images/non-veg-indicator.webp';
import vegIndicator from '@assets/images/veg-indicator.webp';
import { theme } from '@theme';

import {
    StyledCard,
    StyledCardContent,
    StyledCardMedia,
    StyledClosedTag,
    StyledDescription,
    StyledImageIndicator,
    StyledTitle,
} from './RestaurantCard.styles';
import { RestaurantProps } from './RestaurantCard.types';

/**
 * A Restaurant card that displays the details of restaurant.
 * @param RestaurantProps - the configuration property to render the card component for restaurant.
 * @returns The structured and styled restaurant card.
 */
export const RestaurantCard = React.memo(function RestaurantCard({
    data,
    userRole,
    onEdit,
    onDelete,
    onClick,
    isClosed,
}: RestaurantProps) {
    // Handle the fallback case, if image is null or url is wrong.
    const [imgSrc, setImgSrc] = useState(data.imageUrl || FALLBACK_IMAGE);
    return (
        <StyledCard onClick={onClick}>
            <CardActionArea>
                <StyledCardMedia
                    component="img"
                    image={imgSrc}
                    onError={() => {
                        if (imgSrc !== FALLBACK_IMAGE) {
                            setImgSrc(FALLBACK_IMAGE);
                        }
                    }}
                />
                <StyledImageIndicator
                    component="img"
                    image={
                        data.dietaryCategory === 'veg'
                            ? vegIndicator
                            : nonVegIndicator
                    }
                />
                {isClosed && (
                    <StyledClosedTag component="img" image={closedTag} />
                )}

                <StyledCardContent>
                    <StyledTitle gutterBottom variant="subtitle1">
                        {data.name}
                    </StyledTitle>
                    <StyledDescription variant="body2">
                        {data.description}
                    </StyledDescription>
                </StyledCardContent>
            </CardActionArea>

            {/* Show the edit and delete buttons only to the owners */}
            {userRole === 'owner' && (
                <Box
                    display="flex"
                    gap={theme.spacing(4)}
                    padding={theme.spacing(4)}
                >
                    <Button variant="text" onClick={onEdit} fullWidth>
                        <Typography variant="button">Edit</Typography>
                    </Button>
                    <Button variant="error" onClick={onDelete} fullWidth>
                        <Typography variant="button">Delete</Typography>
                    </Button>
                </Box>
            )}
        </StyledCard>
    );
});
