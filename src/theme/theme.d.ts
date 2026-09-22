export declare module '@mui/material/styles/createMixins' {
    interface Mixins {
        lineClamp: (lines: number) => CSSProperties;
    }
}
declare module '@mui/material/Button' {
    interface ButtonPropsVariantOverrides {
        error: true;
    }
}
declare module '@mui/material/IconButton' {
    interface IconButtonOwnProps {
        variant?: 'outlined';
    }
}
