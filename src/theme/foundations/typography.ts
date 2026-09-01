import type { Theme, Components } from '@mui/material/styles';
import type {
    TypographyOptions,
    TypographyUtils,
} from '@mui/material/styles/createTypography';
import '@fontsource/inter';
import { HTML_FONT_SIZE } from '@constant';

import InterLight from 'assets/fonts/inter/Inter-Light.woff2';
import InterRegular from 'assets/fonts/inter/Inter-Regular.woff2';
import InterMedium from 'assets/fonts/inter/Inter-Medium.woff2';
import InterBold from 'assets/fonts/inter/Inter-Bold.woff2';

/* Custom px to rem function */
const typographyUtil: TypographyUtils = {
    pxToRem: (px: number) => `${px / HTML_FONT_SIZE}` + 'rem',
};

/**
 * Creates a typography block with various styles
 * @param theme - Theme object to access the breakpoints.
 * @returns The function returns a TypographyOptions object, which includes various typography settings,
 */
export const typographyStyle = (theme: Theme): TypographyOptions => ({
    fontFamily: 'Inter, sans-serif',
    htmlFontSize: HTML_FONT_SIZE,
    fontSize: HTML_FONT_SIZE,

    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,

    h1: {
        fontSize: typographyUtil.pxToRem(32),
        fontWeight: 700,
        lineHeight: 1.2,
        [theme.breakpoints.up('md')]: {
            fontSize: typographyUtil.pxToRem(40),
            lineHeight: 1.2,
        },
        [theme.breakpoints.up('lg')]: {
            fontSize: typographyUtil.pxToRem(48),
            lineHeight: 1.15,
        },
    },

    h2: {
        fontSize: typographyUtil.pxToRem(28),
        fontWeight: 700,
        lineHeight: 1.3,
        [theme.breakpoints.up('md')]: {
            fontSize: typographyUtil.pxToRem(34),
            lineHeight: 1.2,
        },
        [theme.breakpoints.up('lg')]: {
            fontSize: typographyUtil.pxToRem(40),
            lineHeight: 1.15,
        },
    },

    h3: {
        fontSize: typographyUtil.pxToRem(24),
        fontWeight: 700,
        lineHeight: 1.3,
        [theme.breakpoints.up('md')]: {
            fontSize: typographyUtil.pxToRem(28),
            lineHeight: 1.25,
        },
        [theme.breakpoints.up('lg')]: {
            fontSize: typographyUtil.pxToRem(32),
            lineHeight: 1.2,
        },
    },

    h4: {
        fontSize: typographyUtil.pxToRem(20),
        fontWeight: 700,
        lineHeight: 1.4,
        [theme.breakpoints.up('md')]: {
            fontSize: typographyUtil.pxToRem(22),
            lineHeight: 1.3,
        },
        [theme.breakpoints.up('lg')]: {
            fontSize: typographyUtil.pxToRem(24),
            lineHeight: 1.2,
        },
    },

    h5: {
        fontSize: typographyUtil.pxToRem(18),
        fontWeight: 600,
        lineHeight: 1.4,
        [theme.breakpoints.up('md')]: {
            fontSize: typographyUtil.pxToRem(20),
            lineHeight: 1.35,
        },
    },

    h6: {
        fontSize: typographyUtil.pxToRem(16),
        fontWeight: 500,
        lineHeight: 1.5,
        [theme.breakpoints.up('md')]: {
            fontSize: typographyUtil.pxToRem(18),
            lineHeight: 1.4,
        },
    },

    subtitle1: {
        fontSize: typographyUtil.pxToRem(16),
        fontWeight: 500,
        lineHeight: 1.5,
    },

    subtitle2: {
        fontSize: typographyUtil.pxToRem(14),
        fontWeight: 500,
        lineHeight: 1.5,
    },

    body2: {
        fontSize: typographyUtil.pxToRem(12),
        fontWeight: 400,
        lineHeight: 1.5,
        [theme.breakpoints.up('md')]: {
            fontSize: typographyUtil.pxToRem(14),
        },
    },

    button: {
        fontSize: typographyUtil.pxToRem(14),
        fontWeight: 600,
        lineHeight: 1.4,
        [theme.breakpoints.up('md')]: {
            fontSize: typographyUtil.pxToRem(15),
        },
    },

    caption: {
        fontSize: typographyUtil.pxToRem(12),
        fontWeight: 600,
        lineHeight: 1.4,
        [theme.breakpoints.up('md')]: {
            fontSize: typographyUtil.pxToRem(16),
        },
    },

    overline: {
        fontSize: typographyUtil.pxToRem(12),
        fontWeight: 600,
        lineHeight: 1.4,
    },
});

export const typography = { typographyStyle, typographyUtil, componentsStyle };
