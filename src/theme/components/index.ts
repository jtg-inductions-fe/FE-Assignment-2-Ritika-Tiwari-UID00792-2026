import type { Components, Theme } from '@mui/material/styles';

import InterBoldWOFF2 from '@assets/fonts/inter/Inter-Bold.woff2';
// Local Font files
import InterLightWOFF2 from '@assets/fonts/inter/Inter-Light.woff2';
import InterMediumWOFF2 from '@assets/fonts/inter/Inter-Medium.woff2';
import InterRegularWOFF2 from '@assets/fonts/inter/Inter-Regular.woff2';

const fontFaceDeclarations = `
       @font-face {
        font-display: swap; 
        font-family: 'Inter';
        font-style: normal;
        font-weight: 300;
        src: url(${InterRegularWOFF2}) format('woff2'), 
      };
        @font-face {
        font-display: swap; 
        font-family: 'Inter';
        font-style: normal;
        font-weight: 400;
        src: url(${InterLightWOFF2}) format('woff2'), 
      };
        @font-face {
        font-display: swap; 
        font-family: 'Inter';
        font-style: normal;
        font-weight: 500;
        src: url(${InterMediumWOFF2}) format('woff2'), 
      };
        @font-face {
        font-display: swap; 
        font-family: 'Inter';
        font-style: normal;
        font-weight: 700;
        src: url(${InterBoldWOFF2}) format('woff2'), 
      };
    `;

export const components: Components<Theme> = {
    MuiCssBaseline: {
        styleOverrides: {
            html: {
                fontSize: '62.5%',
            },
            fontFaceDeclarations,
        },
    },
    MuiButton: {
        variants: [
            {
                props: { variant: 'contained' },
                style: ({ theme }) => ({
                    boxShadow: theme.shadows[2],
                    padding: theme.spacing(1, 3),
                    backgroundColor: theme.palette.primary.main,
                    color: theme.palette.primary.contrastText,
                    textTransform: 'none',
                    transition: 'transform 0.3s ease',
                    '&:hover': {
                        backgroundColor: theme.palette.secondary.dark,
                        transform: 'translateY(2px)',
                    },
                }),
            },
            {
                props: { variant: 'text' },
                style: ({ theme }) => ({
                    boxShadow: theme.shadows[2],
                    padding: theme.spacing(1, 3),
                    backgroundColor: theme.palette.background.default,
                    color: theme.palette.text.primary,
                    textTransform: 'none',
                    transition: 'transform 0.3s ease',
                    '&:hover': {
                        backgroundColor: theme.palette.background.default,
                        transform: 'translateY(2px)',
                    },
                }),
            },
        ],
    },
};
