import { useState } from 'react';

import { Box, Button, CardActionArea, Typography } from '@mui/material';

import closedTag from '@assets/images/closed-restaurant.webp';
import fallBackImage from '@assets/images/fallback-image.webp';
import nonVegIndicator from '@assets/images/non-veg-indicator.webp';
import vegIndicator from '@assets/images/veg-indicator.webp';

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
export function RestaurantCard({
    restaurant,
    userRole,
    onEditClick,
    onDelete,
    onRestaurantClick,
    isRestaurantClosed,
}: RestaurantProps) {
    // Handle the fallback case, if image is null or url is wrong.
    const [imgSrc, setImgSrc] = useState(restaurant.imageUrl || fallBackImage);
    return (
        <StyledCard onClick={onRestaurantClick}>
            <CardActionArea>
                <StyledCardMedia
                    component="img"
                    height="140"
                    image={imgSrc}
                    alt={restaurant.name || 'Restaurant'}
                    onError={() => {
                        // Compare state variable directly to avoid endless loop
                        if (imgSrc !== fallBackImage) {
                            setImgSrc(fallBackImage);
                        }
                    }}
                />
                <StyledImageIndicator
                    component="img"
                    image={
                        restaurant.type === 'veg'
                            ? vegIndicator
                            : nonVegIndicator
                    }
                    alt={restaurant.type}
                />
                {isRestaurantClosed && (
                    <StyledClosedTag
                        component="img"
                        height="240"
                        image={closedTag}
                        alt="Restaurant is closed"
                    />
                )}

                <StyledCardContent>
                    <StyledTitle gutterBottom variant="subtitle1">
                        {restaurant.name}
                    </StyledTitle>
                    <StyledDescription variant="body2">
                        {restaurant.description}
                    </StyledDescription>
                </StyledCardContent>
            </CardActionArea>
            {/* Show the edit and delete buttons only to the owners */}
            {userRole === 'owner' && (
                <Box display="flex" gap={1}>
                    <Button variant="text" onClick={onEditClick} fullWidth>
                        <Typography variant="button" textTransform="none">
                            {' '}
                            Edit
                        </Typography>
                    </Button>
                    <Button variant="error" onClick={onDelete} fullWidth>
                        <Typography variant="button" textTransform="none">
                            {' '}
                            Delete
                        </Typography>
                    </Button>
                </Box>
            )}
        </StyledCard>
    );
}
