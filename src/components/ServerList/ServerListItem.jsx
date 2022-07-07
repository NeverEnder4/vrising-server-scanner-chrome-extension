import React from 'react';

import { ListItem, ListItemButton, useTheme } from '@mui/material';
import PropTypes from 'prop-types';

import ServerListItemPing from './ServerListItemPing';
import ServerListItemText from './ServerListItemText';

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
        <ServerListItemPing ping={server.ping} />
      </ListItemButton>

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
    players: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
      }),
    ),
    queryConnect: PropTypes.string,
  }).isRequired,
};

export default ServerListItem;
