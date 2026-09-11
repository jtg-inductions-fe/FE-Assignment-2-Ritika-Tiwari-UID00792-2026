import { Box, Button, CardActionArea, Typography } from '@mui/material';

import nonVegIndicator from '@assets/images/non-veg-indicator.webp';
import vegIndicator from '@assets/images/veg-indicator.webp';

import {
    StyledCard,
    StyledCardContent,
    StyledCardMedia,
    StyledDescription,
    StyledImageIndicator,
} from './RestaurantCard.styles';
import { RestaurantProps } from './RestaurantCard.types';

export default function RestaurantCard({
    restaurant,
    userRole,
    onEditClick,
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
                <StyledCardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {restaurant.name}
                    </Typography>
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
                    paddingBottom={2}
                    marginTop={1}
                >
                    <Button variant="text" onClick={onEditClick}>
                        Edit
                    </Button>
                    <Button color="error" variant="text">
                        Delete
                    </Button>
                </Box>
            )}
        </StyledCard>
    );
}
