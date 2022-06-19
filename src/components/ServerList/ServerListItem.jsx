import React from 'react';

import PropTypes from 'prop-types';

function ServerListItem({ server }) {
  return (
    <div>{JSON.stringify(server, null, 2)}</div>
  );
}

ServerListItem.propTypes = {
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
