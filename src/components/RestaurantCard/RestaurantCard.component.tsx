import {
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Typography,
} from '@mui/material';

import { RestaurantProps } from './RestaurantCard.types';

export default function RestaurantCard({
    restaurant,
}: {
    restaurant: RestaurantProps;
}) {
    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="140"
                    image="/static/images/cards/contemplative-reptile.jpg"
                    alt="green iguana"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {restaurant.name}
                    </Typography>
                    <Typography
                        variant="body2"
                        sx={{ color: 'text.secondary' }}
                    >
                        {restaurant.description}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}
