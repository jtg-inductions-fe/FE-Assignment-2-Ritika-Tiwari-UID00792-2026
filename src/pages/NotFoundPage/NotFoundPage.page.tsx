import { JSX } from 'react';

import PageNotFound from 'assets/images/page-not-fount.svg';
import { useNavigate } from 'react-router-dom';

import { Typography } from '@mui/material';

import { ButtonPrimary,ResponsiveContainer } from '@components';

import { StyledBox, StyledImage } from './NotFoundPage.styles';

/**
 * Fallback page element displayed when the a user navigate to a not existent or invalid URL path.
 * Renders an illustrative 404 image asset with user-friendly redirect navigation controls to home page.
 * @component
 * @returns {JSX.Element}
 */
export const NotFoundPage = (): JSX.Element => {
    /**Hook enabling programmatic user routing actions */
    const navigate = useNavigate();
    /** Action handler that redirects the user back to the home page.
     * @returns {void}
     */
    const handleClick = (): void => {
        void navigate('/home');
    };
    return (
        <ResponsiveContainer>
            <StyledBox>
                <StyledImage src={PageNotFound} alt="Page not found" />
                <Typography
                    variant="body2"
                    color="text.secondary"
                    textAlign={'center'}
                >
                    This is a 404 page and we think it is fairly clear, You are
                    not going to find what you are looking for here, But we know
                    you are hungry, so do not fret or rage Hit that button to go back to our homepage.
                </Typography>

                <ButtonPrimary onClick={handleClick} variant="contained">
                    <Typography variant="button">Back to home</Typography>
                </ButtonPrimary>
            </StyledBox>
        </ResponsiveContainer>
    );
};
