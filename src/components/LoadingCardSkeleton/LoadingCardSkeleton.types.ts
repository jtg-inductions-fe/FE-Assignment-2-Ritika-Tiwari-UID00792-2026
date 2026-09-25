import { BoxProps } from '@mui/material';

/** Interface defining the properties of the LoadingCard skeleton to render the loading cards. */
export interface LoadingCardSkeletonProps {
    variant?: 'row' | 'column' | 'responsive';
}

export interface ContainerProps extends BoxProps {
    variant?: 'row' | 'column' | 'responsive';
}
