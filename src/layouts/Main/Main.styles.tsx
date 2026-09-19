import { Box, styled } from '@mui/material';

import { HEADER_HEIGHT } from '@constant';

export const StyledMain = styled(Box)({
    width: '100%',
    minHeight: `calc(100vh - ${HEADER_HEIGHT}px)`,
    display: 'flex',
    flexDirection: 'column',
});
