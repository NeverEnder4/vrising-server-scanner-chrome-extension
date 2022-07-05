import React from 'react';

import { Box } from '@mui/material';
import PropTypes from 'prop-types';

import ServerMetadata from '../../ServerMetadata';
import Modal from '../Modal';

const LABELED_BY = 'Server Details Modal';
const DESCRIBED_BY = 'Details about a specific dedicated server';

function ServerDetailsModal({ handleClose, server }) {
  const headerConfig = {
    keyExtractor: (tab) => tab.value,
    tabs: [
      {
        value: 'metadata',
        label: 'Metadata',
        renderPanel: () => (
          <ServerMetadata />
        ),
      },
      {
        value: 'settings',
        label: 'Settings',
        renderPanel: () => (
          <Box sx={{ width: '100%', backgroundColor: 'white' }}>SETT</Box>
        ),
      },
    ],
  };

  return (
    <Modal
      open={!!server}
      handleClose={handleClose}
      headerConfig={headerConfig}
      ariaLabeledBy={LABELED_BY}
      ariaDescribedBy={DESCRIBED_BY}
    />
  );
}
ServerDetailsModal.defaultProps = { server: null };

ServerDetailsModal.propTypes = {
  handleClose: PropTypes.func.isRequired,
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
  }),
};

export default ServerDetailsModal;
