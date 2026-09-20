import * as React from 'react';

import OrderStatusTracker from 'components/OrderStatusTracker/OrderStatusTracker';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';

import { theme } from '@theme';

export default function OrderAccordion() {
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
                            Restaurant Name
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                            Pending
                        </Typography>
                    </Box>
                    <Box
                        display="flex"
                        flexDirection="row"
                        justifyContent="space-between"
                    >
                        <Typography variant="body2">Created At : </Typography>
                        <Typography variant="body2">
                            Total amount: 89849328
                        </Typography>
                    </Box>
                </Box>
            </AccordionSummary>
            <AccordionDetails>
                <Box
                    width="100%"
                    display="flex"
                    flexDirection="row"
                    alignItems="center"
                    justifyContent="space-between"
                    marginTop={theme.spacing(8)}
                ></Box>
                <OrderStatusTracker />
            </AccordionDetails>
        </Accordion>
    );
}
