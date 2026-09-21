import { CartCard } from 'components/CartCard/CartCard.component';
import { OrderStatusTracker } from 'components/OrderStatusTracker/OrderStatusTracker.component';
import { STATUS_COLORS } from 'constant/orderConstants';

import { CurrencyRupee } from '@mui/icons-material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';

import { theme } from '@theme';

import { OrderAccordionProps } from './OrderAccordion.types';

/**
 * OrderAccordion component to show orders as accordions.
 *
 * @param OrderAccordionProps -  The configuration properties for the rendering of order accordion component.
 * @returns returns the JSX.Element
 */
export const OrderAccordion = ({
    data,
    userRole,
    onStatusChange,
    isExpanded,
    onToggle,
}: OrderAccordionProps) => (
    <Accordion expanded={isExpanded} onChange={onToggle}>
        <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`${data.orderId}-panel1-content`}
            id={`${data.orderId}-panel1-header`}
        >
            <Box
                width="100%"
                display="flex"
                flexDirection="row"
                justifyContent="space-between"
                alignItems="start"
                padding={theme.spacing(4)}
                gap={theme.spacing(4)}
            >
                <Box
                    display="flex"
                    flexDirection="column"
                    justifyContent="space-between"
                >
                    <Typography variant="h6" color="text.primary">
                        {data.restaurantDetails.name}
                    </Typography>
                    <Typography variant="body2">
                        Created At: {new Date(data.createdAt).toLocaleString()}
                    </Typography>
                </Box>
                <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="end"
                    justifyContent="flex-end"
                >
                    <Typography
                        variant="caption"
                        textAlign="end"
                        color={
                            STATUS_COLORS[data.orderStatus] || 'text.secondary'
                        }
                    >
                        {data.orderStatus}
                    </Typography>

                    <Box
                        display="flex"
                        alignItems="end"
                        justifyContent="flex-end"
                    >
                        <CurrencyRupee color="primary" fontSize="small" />
                        <Typography
                            variant="subtitle2"
                            color={theme.palette.text.secondary}
                        >
                            {data.billDetails.grandTotal}
                        </Typography>
                    </Box>
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
                padding={theme.spacing(4)}
            >
                {data.items.map((item) => (
                    <CartCard
                        key={item.itemId}
                        data={data.restaurantDetails}
                        item={item}
                    />
                ))}
                <Box
                    display="flex"
                    flexDirection="column"
                    gap={theme.spacing(4)}
                    width="100%"
                    marginTop={theme.spacing(4)}
                >
                    <Typography variant="h6">Bill Details</Typography>

                    <Box
                        display="flex"
                        flexDirection="row"
                        justifyContent="space-between"
                        width="100%"
                    >
                        <Typography
                            variant="subtitle2"
                            color={theme.palette.text.secondary}
                        >
                            Total Items
                        </Typography>
                        <Typography
                            variant="subtitle2"
                            color={theme.palette.text.secondary}
                        >
                            {data.billDetails.itemsCount}
                        </Typography>
                    </Box>
                    <Box
                        display="flex"
                        flexDirection="row"
                        justifyContent="space-between"
                        width="100%"
                    >
                        <Typography
                            variant="subtitle2"
                            color={theme.palette.text.secondary}
                        >
                            Delivery Charges
                        </Typography>
                        <Box display="flex" alignItems="center">
                            <CurrencyRupee color="primary" fontSize="small" />
                            <Typography
                                variant="subtitle2"
                                color={theme.palette.text.secondary}
                            >
                                {data.billDetails.deliveryFee}
                            </Typography>
                        </Box>
                    </Box>
                    <Box
                        display="flex"
                        flexDirection="row"
                        justifyContent="space-between"
                        width="100%"
                    >
                        <Typography
                            variant="subtitle2"
                            color={theme.palette.text.secondary}
                        >
                            Grand Total
                        </Typography>
                        <Box display="flex" alignItems="center">
                            <CurrencyRupee color="primary" fontSize="small" />
                            <Typography
                                variant="subtitle2"
                                color={theme.palette.text.secondary}
                            >
                                {data.billDetails.grandTotal}
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            </Box>
            <OrderStatusTracker
                orderId={data.orderId}
                userRole={userRole}
                orderStatus={data.orderStatus}
                onStatusChange={onStatusChange}
            />
        </AccordionDetails>
    </Accordion>
);
