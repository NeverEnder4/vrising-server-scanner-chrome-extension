import React from 'react';

import DangerousIcon from '@mui/icons-material/Dangerous';
import {
  ListItem,
  ListItemButton,
  Box,
  useTheme,
  Typography,
} from '@mui/material';
import PropTypes from 'prop-types';

import ServerListItemPing from './ServerListItemPing';
import ServerListItemText from './ServerListItemText';

const ICON_SIZE = 16;
function ServerListItem({ server, onClick }) {
  const theme = useTheme();

  const serverName = server.nickname || server.name;

  return (
    <ListItem
      role="listitem"
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        backgroundColor: theme.palette.common.black,
        boxShadow: theme.shadows[4],
        marginBottom: theme.spacing(1),
        position: 'relative',
      }}
    >
      <ListItemButton
        disableGutters
        onClick={onClick}
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <ServerListItemText
          inset
          primary={serverName?.toUpperCase()}
          secondary={server.queryConnect}
        />
        {server?.queryFailed ? null : <ServerListItemPing ping={server.ping} />}
      </ListItemButton>
      {server?.queryFailed && (
        <Box
          sx={{
            height: '100%',
            padding: theme.spacing(3, 2),
            position: 'absolute',
            bottom: 0,
            right: 0,
            top: 0,
            backgroundColor: theme.palette.primary.main,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            pointerEvents: 'none',
          }}
        >
          <DangerousIcon
            sx={{
              width: ICON_SIZE,
              height: ICON_SIZE,
              fill: theme.palette.common.white,
              marginBottom: theme.spacing(0.5),
            }}
          />
          <Typography variant="body2">Connection</Typography>
          <Typography variant="body2">Failed</Typography>

        </Box>
      )}
    </ListItem>
  );
}

ServerListItem.defaultProps = {
  onClick: undefined,
};

ServerListItem.propTypes = {
  onClick: PropTypes.func,
  server: PropTypes.shape({
    bots: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
      }),
    ),
    map: PropTypes.string,
    maxPlayers: PropTypes.number,
    name: PropTypes.string,
    nickname: PropTypes.string,
    notes: PropTypes.string,
    password: PropTypes.bool,
    ping: PropTypes.number,
    queryFailed: PropTypes.bool,
    players: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
      }),
    ),
    queryConnect: PropTypes.string,
  }).isRequired,
};

export default ServerListItem;
