import { CardActionArea, Typography } from '@mui/material';
import {
    StyledCard,
    StyledCardContent,
    StyledCardMedia,
} from './RestaurantCard.styles';
import { RestaurantProps } from './RestaurantCard.types';

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
                    alt="green iguana"
                />
                <StyledCardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {restaurant.name}
                    </Typography>
                    <Typography
                        variant="body2"
                        sx={{ color: 'text.secondary' }}
                    >
                        {restaurant.description}
                    </Typography>
                </StyledCardContent>
            </CardActionArea>
        </StyledCard>
    );
}
