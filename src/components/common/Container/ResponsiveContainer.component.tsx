import { JSX, PropsWithChildren } from 'react';

import { StyledContainer } from './ResponsiveContainer.styles';

/**
 * A responsive layout wrapper component that centers its child elements horizontally and applies layout margins.
 * @param {PropsWithChildren} props - the component property.
 * @returns {JSX.Element} The rendered styled container structured.
 */
export const ResponsiveContainer = ({
    children,
}: PropsWithChildren): JSX.Element => (
    <StyledContainer>{children}</StyledContainer>
);
