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
 * A menu card that displays the details of menu.
 * @param MenuProps - the configuration property to render the card component for menu.
 * @returns The structured and styled menu card.
 */
export function MenuCard({
    menu,
    userRole,
    onEditClick,
    onDelete,
}: MenuCardProps) {
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
                        {menu.name}
                    </StyledTitle>
                    <StyledDescription variant="body2" gutterBottom>
                        {menu.description}
                    </StyledDescription>
                    <Box
                        display="flex"
                        alignItems="center"
                        marginBlock={theme.spacing(1.6)}
                    >
                        <CurrencyRupee color="primary" />
                        <Typography variant="h6">{menu.price}</Typography>
                    </Box>
                    {/* Show the edit and delete buttons only to the owners */}
                    {userRole === 'owner' ? (
                        <Box display="flex" gap={1} alignSelf="end">
                            <Button
                                variant="text"
                                onClick={onEditClick}
                                fullWidth
                            >
                                <Typography
                                    variant="button"
                                    textTransform="none"
                                >
                                    {' '}
                                    Edit
                                </Typography>
                            </Button>
                            <Button
                                variant="error"
                                onClick={onDelete}
                                fullWidth
                            >
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
