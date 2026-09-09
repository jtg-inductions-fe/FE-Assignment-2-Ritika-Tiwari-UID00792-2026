import type { PaletteOptions } from '@mui/material/styles';

import { COLORS } from '@constant';

export const palette: PaletteOptions = {
    // Primary brand color used for buttons, links and focused states
    primary: {
        main: COLORS.BRAND.PRIMARY,
        contrastText: COLORS.TEXT.ON_PRIMARY,
    },
    // Secondary brand variation for accent elements
    secondary: {
        main: COLORS.BRAND.SECONDARY,
        dark: COLORS.BRAND.ACCENT_HOVER,
        light: COLORS.BRAND.ACCENT_LIGHT,
        contrastText: COLORS.TEXT.ON_PRIMARY,
    },
    // Background colors for the pages and paper components
    background: {
        default: COLORS.SURFACE.BG_PRIMARY,
        paper: COLORS.SURFACE.BG_SECONDARY,
    },
    // Colors used for the typography
    text: {
        primary: COLORS.TEXT.PRIMARY,
        secondary: COLORS.TEXT.SECONDARY,
        disabled: COLORS.TEXT.MUTED,
    },
    // Action colors for interactive component states
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
