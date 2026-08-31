import type { PaletteOptions } from '@mui/material/styles';

import { COLORS } from '@constant';

export const palette: PaletteOptions = {
    // Colors to show the brand identifications
    primary: {
        main: COLORS.BRAND.PRIMARY,
        contrastText: COLORS.TEXT.ON_PRIMARY,
    },
    // Colors for the interative elements
    secondary: {
        main: COLORS.BRAND.ACCENT,
        dark: COLORS.BRAND.ACCENT_HOVER,
        light: COLORS.BRAND.ACCENT_LIGHT,
        contrastText: COLORS.TEXT.ON_ACCENT,
    },
    // Colors used for the background of pages and cards
    background: {
        default: COLORS.SURFACE.CANVAS,
        paper: COLORS.SURFACE.CARD,
    },
    // Colors used for the typography
    text: {
        primary: COLORS.TEXT.PRIMARY,
        secondary: COLORS.TEXT.SECONDARY,
        disabled: COLORS.TEXT.MUTED,
    },
    // Colors for the disabled states of the components
    action: {
        disabledBackground: COLORS.STATE.DISABLED,
        disabled: COLORS.TEXT.MUTED,
    },
    // Colors for the feedback, warning and error state on the website
    success: {
        main: COLORS.SYSTEM.SUCCESS,
        light: COLORS.SYSTEM.SUCCESS_BG,
    },
    error: {
        main: COLORS.SYSTEM.ERROR,
        light: COLORS.SYSTEM.ERROR_BG,
    },
    warning: {
        main: COLORS.SYSTEM.WARNING,
        light: COLORS.SYSTEM.WARNING_BG,
    },
    info: {
        main: COLORS.SYSTEM.INFO,
        light: COLORS.SYSTEM.INFO_BG,
    },
};
