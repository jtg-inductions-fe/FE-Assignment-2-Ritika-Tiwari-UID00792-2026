import PageNotFound from 'assets/images/page-not-fount.svg';
import { ResponsiveContainer } from 'components/layouts/Container/ResponsiveContainer.component';
import { useNavigate } from 'react-router-dom';

import {
    StyledBox,
    StyledButton,
    StyledDescription,
    StyledImage,
} from './NotFoundPage.page.styled';

export const NotFoundPage = () => {
    const navigate = useNavigate();
    const handleClick = () => {
        void navigate('/home');
    };
    return (
        <ResponsiveContainer>
            <StyledBox>
                <StyledImage src={PageNotFound} alt="Page not found" />
                <StyledDescription>
                    This is a 404 page and we think it is fairly clear You are
                    not going to find what you are looking for here But we know
                    you are hungry, so do not fret or rage Hit that big green
                    button to go back to our homepage
                </StyledDescription>

                <StyledButton onClick={handleClick} variant="contained">
                    Back to home
                </StyledButton>
            </StyledBox>
        </ResponsiveContainer>
    );
};
