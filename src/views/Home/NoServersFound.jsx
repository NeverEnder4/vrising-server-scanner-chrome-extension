import React from 'react';

import StorageIcon from '@mui/icons-material/Storage';
import { Typography, Box, useTheme } from '@mui/material';

import { HEADER_HEIGHT } from '../../layouts/PopupLayout/Header/constant';
import FAB_DIAMETER from './constant';

const NSF = 'NO SERVERS FOUND';
const NSF_DESCRIPTION = 'Use the floating action button below to search for dedicated V Rising servers to add.';
const CONTAINER_WIDTH = '100%';
const ICON_DIMENSION = 50;
const FAB_VERTICAL_MARGIN = 48;

function NoServersFound() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: CONTAINER_WIDTH,
        height: `calc(${CONTAINER_WIDTH} - ${HEADER_HEIGHT}px - ${FAB_DIAMETER}px - ${FAB_VERTICAL_MARGIN}px)`,
      }}
    >
      <StorageIcon
        sx={{
          width: ICON_DIMENSION,
          height: ICON_DIMENSION,
          fill: theme.palette.secondary.light,
        }}
      />
      <Typography sx={{ marginBottom: theme.spacing(1) }} variant="h1">
        {NSF}
      </Typography>
      <Typography sx={{ textAlign: 'center', width: 275 }} variant="body2">
        {NSF_DESCRIPTION}
      </Typography>
    </Box>
  );
}

export default NoServersFound;
