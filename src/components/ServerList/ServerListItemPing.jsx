import React from 'react';

import {
  ListItemText, Typography, Box, useTheme,
} from '@mui/material';
import PropTypes from 'prop-types';

const PING_CIRCLE_SIZE = 6;

function ServerListItemPing({ ping }) {
  const theme = useTheme();

  function getPingColor({ value }) {
    if (value < 100) return theme.palette.success.light;
    if (value >= 100 && value < 200) return theme.palette.warning.light;
    return theme.palette.error.light;
  }

  const color = getPingColor({ value: ping });

  return (
    <ListItemText
      disableTypography
      sx={{
        flexGrow: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
      primary={(
        <Typography
          sx={{
            color: theme.palette.common.white,
            fontWeight: 'bold',
            fontSize: 12,
          }}
        >
          PING
        </Typography>
      )}
      secondary={(
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box
            sx={{
              borderRadius: '50%',
              width: PING_CIRCLE_SIZE,
              height: PING_CIRCLE_SIZE,
              backgroundColor: color,
              marginRight: theme.spacing(0.25),
            }}
          />
          <Typography
            sx={{
              color: theme.palette.secondary.light,
              fontWeight: 'bold',
              fontSize: 12,
              alignSelf: 'center',
            }}
          >
            {ping}
          </Typography>
        </Box>
      )}
    />
  );
}

ServerListItemPing.propTypes = {
  ping: PropTypes.number.isRequired,
};

export default ServerListItemPing;
