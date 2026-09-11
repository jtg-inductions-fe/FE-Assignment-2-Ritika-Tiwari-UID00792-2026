import { Box, Button, CardActionArea } from '@mui/material';

import nonVegIndicator from '@assets/images/non-veg-indicator.webp';
import vegIndicator from '@assets/images/veg-indicator.webp';
import closedTag from '@assets/images/closed-restaurant.webp';

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

export default function RestaurantCard({
    restaurant,
    userRole,
    onEditClick,
    onDelete,
    isRestaurantClosed,
}: RestaurantProps) {
    return (
        <StyledCard>
            <CardActionArea>
                <StyledCardMedia
                    component="img"
                    height="140"
                    image={restaurant.imageUrl}
                    alt={restaurant.name}
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

            {userRole === 'owner' && (
                <Box
                    display="flex"
                    justifyContent="space-between"
                    paddingX={2}
                    paddingBottom={1}
                >
                    <Button variant="text" onClick={onEditClick}>
                        Edit
                    </Button>
                    <Button variant="error" onClick={onDelete}>
                        Delete
                    </Button>
                </Box>
            )}
        </StyledCard>
    );
}
