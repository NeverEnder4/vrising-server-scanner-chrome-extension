import React from 'react';

import RefreshIcon from '@mui/icons-material/Refresh';
import SettingsIcon from '@mui/icons-material/Settings';
import { Box, IconButton, useTheme } from '@mui/material';
import { keyframes } from '@mui/system';

import useServers from '../../../hooks/useServers';

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(359deg);
  }
`;

const ICON_WIDTH = 28;

function HeaderButtons() {
  const theme = useTheme();
  const { refresh, loading } = useServers();
  const ICON_BUTTON_PADDING = theme.spacing(0.25);

  return (
    <Box sx={{ alignSelf: 'flex-start', marginTop: theme.spacing(1) }}>
      <IconButton
        onClick={refresh}
        disabled={loading}
        aria-label="Refresh"
        sx={{ padding: ICON_BUTTON_PADDING }}
      >
        <RefreshIcon
          sx={{
            fill: theme.palette.common.white,
            width: ICON_WIDTH,
            animation: loading ? `${spin} 1s ease` : undefined,
          }}
        />
      </IconButton>
      <IconButton aria-label="Settings" sx={{ padding: ICON_BUTTON_PADDING }}>
        <SettingsIcon
          sx={{ fill: theme.palette.secondary.light, width: ICON_WIDTH }}
        />
      </IconButton>
    </Box>
  );
}

export default HeaderButtons;
