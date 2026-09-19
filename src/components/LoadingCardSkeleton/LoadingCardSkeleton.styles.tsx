import { Box, BoxProps, Skeleton, SkeletonProps, styled } from '@mui/material';

// Changed to a vertical layout column with standard card boundaries
export const CardContainer = styled(Box)<BoxProps>(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(4),
    padding: theme.spacing(4),
    maxWidth: 245,
    width: '40%',
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadius,
}));

// Structural container holding text lines below the header/media section
export const CardBody = styled(Box)<BoxProps>(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(4),
    width: '100%',
}));

// Base skeleton styling for consistent shimmer tinting
export const BaseSkeleton = styled(Skeleton)<SkeletonProps>(({ theme }) => ({
    borderRadius: theme.shape.borderRadius,
    '&::after': {
        background: `linear-gradient(90deg, transparent, ${theme.palette.background.default}, transparent)`,
    },
}));
