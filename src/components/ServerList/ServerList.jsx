import React, { useState } from 'react';

import StorageIcon from '@mui/icons-material/Storage';
import {
  List, Box, Typography, useTheme,
} from '@mui/material';
import PropTypes from 'prop-types';

import { ServerDetailsModal } from '../Modals';
import ServerListItem from './ServerListItem';

const ICON_SIZE = 14;

function ServerList({ servers }) {
  const [serverData, setServerData] = useState(null);

  const theme = useTheme();

  const handleClose = () => {
    setServerData(null);
  };

  function renderServers() {
    return servers.map((server) => {
      const handleClick = () => {
        setServerData(server);
      };
      return (
        <ServerListItem onClick={handleClick} key={server.queryConnect} server={server} />
      );
    });
  }

  return (
    <>
      <ServerDetailsModal open={!!serverData} handleClose={handleClose} />
      <Box>
        <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: theme.spacing(0.5) }}>
          <StorageIcon
            sx={{
              fill: theme.palette.secondary.light,
              width: ICON_SIZE,
              height: ICON_SIZE,
              marginRight: theme.spacing(0.5),
            }}
          />
          <Typography
            sx={{
              color: theme.palette.secondary.light,
              fontSize: 12,
              fontWeight: 'bold',
            }}
          >
            SERVERS - Click on a server to view details
          </Typography>
        </Box>
        <List role="list">{renderServers()}</List>
      </Box>
    </>
  );
}

ServerList.defaultProps = {
  servers: [],
};

ServerList.propTypes = {
  servers: PropTypes.arrayOf(
    PropTypes.shape({
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
    }),
  ),
};

export default ServerList;
