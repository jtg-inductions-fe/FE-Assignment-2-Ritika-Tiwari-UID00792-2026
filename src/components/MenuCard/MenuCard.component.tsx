import { useState } from 'react';

import { CurrencyRupee } from '@mui/icons-material';
import { Box, Button, Typography } from '@mui/material';

import fallBackImage from '@assets/images/fallback-image.webp';
import { theme } from '@theme';

import {
    StyledCard,
    StyledCardActionArea,
    StyledCardContent,
    StyledCardMedia,
    StyledDescription,
    StyledTitle,
} from './MenuCard.styles';
import { MenuCardProps } from './MenuCard.types';
import restImage from '../../../public/res-image/res-image5.webp';
/**
 * A Restaurant card that displays the details of restaurant.
 * @param RestaurantProps - the configuration property to render the card component for restaurant.
 * @returns The structured and styled restaurant card.
 */
export function MenuCard({ menu, userRole }: MenuCardProps) {
    const [imgSrc, setImgSrc] = useState(restImage || fallBackImage);
    return (
        <StyledCard>
            <StyledCardActionArea>
                <StyledCardMedia
                    component="img"
                    height="140"
                    image={restImage}
                    alt={menu.name}
                    onError={() => {
                        // Compare state variable directly to avoid endless loop
                        if (imgSrc !== fallBackImage) {
                            setImgSrc(fallBackImage);
                        }
                    }}
                />
                <StyledCardContent>
                    <StyledTitle gutterBottom variant="subtitle1">
                        Chef and son
                    </StyledTitle>
                    <StyledDescription variant="body2" gutterBottom>
                        Lorem, ipsum dolor sit amet consectetur adipisicing
                        elit. Eligendi ad tempora accusamus temporibus ullam
                        labore eius, quis delectus alias soluta velit expedita
                        corrupti, cumque laboriosam deleniti quaerat? Dolor,
                        totam repellat!
                    </StyledDescription>
                    <Box
                        display="flex"
                        alignItems="center"
                        marginBlock={theme.spacing(1.6)}
                    >
                        <CurrencyRupee color="primary" />
                        <span>1,500</span>
                    </Box>
                    {/* Show the edit and delete buttons only to the owners */}
                    {userRole === 'owner' ? (
                        <Box display="flex" gap={1} alignSelf="end">
                            <Button variant="text">
                                <Typography
                                    variant="button"
                                    textTransform="none"
                                >
                                    {' '}
                                    Edit
                                </Typography>
                            </Button>
                            <Button variant="error">
                                <Typography
                                    variant="button"
                                    textTransform="none"
                                >
                                    {' '}
                                    Delete
                                </Typography>
                            </Button>
                        </Box>
                    ) : (
                        <Button variant="contained">
                            <Typography variant="button" textTransform="none">
                                Add to card
                            </Typography>
                        </Button>
                    )}
                </StyledCardContent>
            </StyledCardActionArea>
        </StyledCard>
    );
}
