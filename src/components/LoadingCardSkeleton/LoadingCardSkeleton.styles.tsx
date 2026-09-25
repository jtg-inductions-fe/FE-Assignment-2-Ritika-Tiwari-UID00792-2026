import {
    Box,
    BoxProps,
    ContainerProps,
    Skeleton,
    SkeletonProps,
    styled,
} from '@mui/material';

// Filter out the custom 'variant' prop from leaking to the DOM Box element
export const CardContainer = styled(Box, {
    shouldForwardProp: (prop) => prop !== 'variant',
})<ContainerProps & { variant?: string }>(({ theme, variant = 'column' }) => ({
    position: 'relative',
    display: 'flex',
    padding: theme.spacing(4),
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadius,

    // Handle standard vertical cards
    ...(variant === 'column' && {
        flexDirection: 'column',
        gap: theme.spacing(4),
        alignItems: 'center',
        minWidth: 220,
        width: '30%',
        maxWidth: 300,
        flexGrow: 1,
    }),

    // Handle strict horizontal cards
    ...(variant === 'row' && {
        flexDirection: 'row',
        gap: theme.spacing(4),
        alignItems: 'center',
        width: '100%',
    }),

    // Match the specific screen with your 'StyledCard' behavior
    ...(variant === 'responsive' && {
        flexDirection: 'column',
        gap: theme.spacing(4),
        alignItems: 'center',
        minWidth: 220,
        width: '30%',
        maxWidth: 300,
        flexGrow: 1,
        [theme.breakpoints.up('md')]: {
            flexDirection: 'row',
            minWidth: '100%',
        },
    }),
}));

export const CardBody = styled(Box)<BoxProps>(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(4),
    width: '100%',
}));

// Filter out 'layoutVariant' from leaking to the DOM Skeleton element
export const BaseSkeleton = styled(Skeleton, {
    shouldForwardProp: (prop) => prop !== 'layoutVariant',
})<SkeletonProps & { layoutVariant?: string }>(({ theme, layoutVariant }) => ({
    borderRadius: theme.shape.borderRadius,

    // Adapt image dimension behavior depending on layout variant
    ...(layoutVariant === 'responsive' && {
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: 140,
            height: 140,
        },
    }),

    '&::after': {
        background: `linear-gradient(90deg, transparent, ${theme.palette.background.default}, transparent)`,
    },
}));
