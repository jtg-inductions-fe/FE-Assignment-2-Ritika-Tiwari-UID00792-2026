import { CardMedia } from '@mui/material';

import styled from '@emotion/styled/macro';

export const StyledCardMedia = styled(CardMedia)({
    width: 100,
    height: 50,
    objectFit: 'cover',
}) as typeof CardMedia;
