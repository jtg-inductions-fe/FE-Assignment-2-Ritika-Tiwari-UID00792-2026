import * as React from 'react';

import { CartCard } from 'components/CartCard/CartCard.component';
import OrderStatusTracker from 'components/OrderStatusTracker/OrderStatusTracker';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';

import { theme } from '@theme';

import { OrderAccordionProps } from './OrderAccordion.types';

export const OrderAccordion = ({ data }: OrderAccordionProps) => {
    const id = React.useId();

    return (
        <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`${id}-panel1-content`}
                id={`${id}-panel1-header`}
            >
                <Box
                    width="100%"
                    display="flex"
                    flexDirection="column"
                    justifyItems="space-between"
                    padding={theme.spacing(4)}
                >
                    <Box
                        display="flex"
                        flexDirection="row"
                        justifyContent="space-between"
                    >
                        <Typography variant="h6" color="text.primary">
                            {data.restaurantDetails.name}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                            {data.orderStatus}
                        </Typography>
                    </Box>
                    <Box
                        display="flex"
                        flexDirection="row"
                        justifyContent="space-between"
                    >
                        <Typography variant="body2">
                            Created At: {data.createdAt}{' '}
                        </Typography>
                        <Typography variant="body2">
                            Total amount: {data.billDetails.grandTotal}
                        </Typography>
                    </Box>
                </Box>
            </AccordionSummary>
            <AccordionDetails>
                <Box
                    width="100%"
                    display="flex"
                    flexDirection="column"
                    alignItems="start"
                    justifyContent="space-between"
                    gap={theme.spacing(4)}
                >
                    {data.items.map((item) => (
                        <CartCard
                            key={item.itemId}
                            data={data.restaurantDetails}
                            item={item}
                        />
                    ))}
                </Box>
                <OrderStatusTracker />
            </AccordionDetails>
        </Accordion>
    );
};
