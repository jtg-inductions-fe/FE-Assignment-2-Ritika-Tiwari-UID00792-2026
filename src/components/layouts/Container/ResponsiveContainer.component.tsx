import { PropsWithChildren } from 'react';

import { StyledContainer } from './ResponsiveContainer.component.styled';

/**
 * Create a Container wrapper around the MUI Container
 */
export const ResponsiveContainer = ({ children }: PropsWithChildren) => <StyledContainer>{children}</StyledContainer>;
