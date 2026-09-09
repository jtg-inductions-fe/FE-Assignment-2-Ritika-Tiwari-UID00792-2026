import { CardActionArea, Typography } from '@mui/material';
import {
    StyledCard,
    StyledCardContent,
    StyledCardMedia,
    StyledDescription,
    StyledImageIndicator,
} from './RestaurantCard.styles';
import { RestaurantProps } from './RestaurantCard.types';
import vegIndicator from '@assets/images/veg-indicator.webp';
import nonVegIndicator from '@assets/images/non-veg-indicator.webp';

export default function RestaurantCard({
    restaurant,
}: {
    restaurant: RestaurantProps;
}) {
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
        </StyledCard>
    );
}
