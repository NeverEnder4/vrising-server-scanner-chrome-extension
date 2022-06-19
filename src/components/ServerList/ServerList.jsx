import React from 'react';

import { Box } from '@mui/material';
import PropTypes from 'prop-types';

import ServerListItem from './ServerListItem';

function ServerList({ servers }) {
  function renderServers() {
    return servers.map((server) => (
      <ServerListItem key={server.queryConnect} server={server} />
    ));
  }

  return <Box>{renderServers()}</Box>;
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
