import React from 'react';

import StorageIcon from '@mui/icons-material/Storage';
import {
  List, Box, useTheme,
} from '@mui/material';
import PropTypes from 'prop-types';

import useServers from '../../hooks/useServers';
import { ServerDetailsModal } from '../Modals';
import TitleWithIcon from '../TitleWithIcon';
import ServerListItem from './ServerListItem';

function ServerList({ servers }) {
  const { selectedServer, setSelectedServer } = useServers();
  const theme = useTheme();

  const handleClose = () => {
    setSelectedServer(null);
  };

  function renderServers() {
    return servers.map((server) => (
      <ServerListItem key={server.queryConnect} server={server} />
    ));
  }

  const renderIcon = (defaultStyles) => (
    <StorageIcon
      sx={{
        ...defaultStyles,
      }}
    />
  );

  return (
    <>
      <ServerDetailsModal server={selectedServer} handleClose={handleClose} />
      <Box>
        <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: theme.spacing(2) }}>
          <TitleWithIcon title="SERVERS - Click on a server to view details" renderIcon={renderIcon} />
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
