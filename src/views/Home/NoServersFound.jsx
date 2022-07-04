import React from 'react';

import StorageIcon from '@mui/icons-material/Storage';
import { Typography, Box, useTheme } from '@mui/material';

import FAB_DIAMETER from '../../components/Modals/AddServerButtonModal/constant';
import { HEADER_HEIGHT } from '../../layouts/PopupLayout/Header/constant';

const NSF = 'NO SERVERS FOUND';
const NSF_DESCRIPTION = 'Use the button below to add dedicated V Rising servers.';
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
        height: `calc(100vh - ${HEADER_HEIGHT}px - ${FAB_DIAMETER}px - ${FAB_VERTICAL_MARGIN}px)`,
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
