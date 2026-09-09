import { JSX, PropsWithChildren } from 'react';

import { StyledContainer } from './ResponsiveContainer.styles';

/**
 * A responsive layout wrapper component that centers its child elements horizontally and applies layout margins.
 * @param PropsWithChildren - the configuration property containing the child elements to be nested inside the container.
 * @returns The structured and styled layout container.
 */
export const ResponsiveContainer = ({
    children,
}: PropsWithChildren): JSX.Element => (
    <StyledContainer>{children}</StyledContainer>
);
