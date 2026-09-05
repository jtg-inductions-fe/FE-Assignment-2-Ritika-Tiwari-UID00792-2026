/**
 * Color palette used in the application.
 * @constant
 */
export const COLORS = {
    // Colors for the brand
    BRAND: {
        PRIMARY: '#70E000',
        SECONDARY: '#387600',
        ACCENT_HOVER: '#5BB300',
        ACCENT_LIGHT: '#F4FFE6',
    },

    // Colors used for application surfaces such as pages, cards, container, and sections.
    SURFACE: {
        // COlor used for the page background
        BG_PRIMARY: '#FFFFFF',
        // COlor used for the cards and container and sections
        BG_SECONDARY: '#F9FBF9',
        // Color used for the muted/disabled state
        MUTED: '#F3F4F6',
    },

    // Colors used for the typography
    TEXT: {
        PRIMARY: '#111827',
        SECONDARY: '#4B5563',
        MUTED: '#9CA3AF',
        // Color used for the typography, used on the primary background color
        ON_PRIMARY: '#FFFFFF',
        // Color used for the typography, used on the secondary background color
        ON_ACCENT: '#1B4332',
    },

    // Colors for the different states of the components (outlined buttons and check-boxes)
    STATE: {
        DEFAULT: '#D1D5DB',
        FOCUS: '#1B4332',
        DISABLED: '#E5E7EB',
    },

    // Colors to show the error, warning and order tracking states
    SYSTEM: {
        SUCCESS: '#0E9F6E',
        SUCCESS_BG: '#E6F6F0',

        ERROR: '#F05252',
        ERROR_BG: '#FDE8E8',

        WARNING: '#F39C12',
        WARNING_BG: '#FEF3C7',

        INFO: '#3B82F6',
        INFO_BG: '#EFF6FF',
    },
};

/**
 * Base font size in pixels.
 * @constant
 */
export const HTML_FONT_SIZE = 10;

/**
 * Scaling factor used for spacing.
 * @constant
 */
export const SCALING_FACTOR = 4;
