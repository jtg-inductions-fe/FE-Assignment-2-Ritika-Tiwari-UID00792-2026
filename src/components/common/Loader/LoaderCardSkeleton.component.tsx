import { Box, BoxProps, Skeleton, SkeletonProps, styled } from '@mui/material';

// Changed to a vertical layout column with standard card boundaries
export const CardContainer = styled(Box)<BoxProps>(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
    padding: theme.spacing(2),
    maxWidth: 245,
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadius || 8,
    backgroundColor: theme.palette.background.paper,
}));

// Structural container holding text lines below the header/media section
export const CardBody = styled(Box)<BoxProps>(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(1),
    width: '100%',
}));

// Base skeleton styling for consistent shimmer tinting
export const BaseSkeleton = styled(Skeleton)<SkeletonProps>(({ theme }) => ({
    backgroundColor: theme.palette.action.hover,
    '&::after': {
        background: `linear-gradient(90deg, transparent, ${theme.palette.action.selected}, transparent)`,
    },
}));

// Text skeleton matching card body typography line heights
export const TextSkeleton = styled(BaseSkeleton)<SkeletonProps>(
    ({ theme }) => ({
        fontSize: theme.typography.body2.fontSize,
        lineHeight: theme.typography.body2.lineHeight || 1.43,
        transform: 'none',
    }),
);
