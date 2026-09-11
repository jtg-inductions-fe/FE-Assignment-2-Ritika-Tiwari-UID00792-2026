import { JSX } from 'react';

import { useNavigate } from 'react-router-dom';

import { Button, Typography } from '@mui/material';

import PageNotFound from '@assets/images/page-not-found.webp';
import { ResponsiveContainer } from '@components';
import { ROUTES } from '@routes';

import { StyledBox, StyledImage } from './NotFoundPage.styles';
/**
 * Fallback UI displayed when the a user navigate to a not existent or invalid URL path.
 * Renders an illustrative 404 image asset with user-friendly redirect navigation controls to home page.
 * @returns returned the structured and styled not found page.
 */
export const NotFoundPage = (): JSX.Element => {
    /**Hook enabling programmatic user routing actions */
    const navigate = useNavigate();

    /** Action handler that redirects the user back to the home page.
     * @returns void
     */
    const handleClick = (): void => {
        void navigate(ROUTES.ROOT);
    };
    return (
        <ResponsiveContainer>
            <StyledBox>
                <StyledImage src={PageNotFound} alt="Page not found" />
                <Typography
                    variant="body2"
                    color="text.secondary"
                    textAlign="center"
                >
                    You took a wrong turn down an empty aisle. Let&apos;s get
                    you back to the main course.
                </Typography>

                <Button variant="contained" onClick={handleClick}>
                    <Typography variant="button">Back to home</Typography>
                </Button>
            </StyledBox>
        </ResponsiveContainer>
    );
};
