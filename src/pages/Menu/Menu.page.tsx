import { useState } from 'react';

import AddIcon from '@mui/icons-material/Add';
import { Box, Button, Fab, useMediaQuery } from '@mui/material';

import { MenuCard, ResponsiveContainer, Snackbar } from '@components';
import { useMenu } from '@hooks';
import { theme } from '@theme';

/**
 * Renders the Menu page.
 * @returns JSX.Element - The rendered Menu page.
 */
export const Menu = () => {
    const { userRole, menuItems } = useMenu();
    const [isSnackbarOpen, setIsSnackbarOpen] = useState<boolean>(false);

    // Returns true if screen width is smaller than the 'md' breakpoint.
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    return (
        <ResponsiveContainer>
            {/* Add Menu option will only show to owners */}
            {userRole === 'owner' && isMobile && (
                <Fab color="primary" aria-label="add">
                    <AddIcon />
                </Fab>
            )}

            {userRole === 'owner' && !isMobile && (
                <Button variant="contained" startIcon={<AddIcon />}>
                    Add Menu
                </Button>
            )}
            <Box
                display="flex"
                flexDirection="row"
                flexWrap="wrap"
                gap={theme.spacing(2)}
                alignItems="center"
                justifyContent="center"
                marginBlock={theme.spacing(3.2)}
            >
                {menuItems.map((menu) => (
                    <MenuCard
                        key={menu.menuId}
                        menu={menu}
                        userRole={userRole}
                    />
                ))}
            </Box>

            <Snackbar
                open={isSnackbarOpen}
                autoHideDuration={2000}
                onClose={() => setIsSnackbarOpen(false)}
                message="Some Error Occurred, Try later."
                state="error"
            />
        </ResponsiveContainer>
    );
};
