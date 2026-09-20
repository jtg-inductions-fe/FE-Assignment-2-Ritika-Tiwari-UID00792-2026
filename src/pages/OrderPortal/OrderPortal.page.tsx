import OrderAccordion from 'components/OrderAccordion/OrderAccordion.component';

import { Box } from '@mui/material';

import { theme } from '@theme';

export const OrderPortal = () => (
        <Box flexGrow={1} marginTop={theme.spacing(8)}>
            <OrderAccordion></OrderAccordion>
        </Box>
    );
