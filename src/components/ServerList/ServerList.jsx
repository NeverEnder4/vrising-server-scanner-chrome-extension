import React from 'react';

import { arrayMove } from '@dnd-kit/sortable';
import StorageIcon from '@mui/icons-material/Storage';
import { List, Box, useTheme } from '@mui/material';
import PropTypes from 'prop-types';

import useServers from '../../hooks/useServers';
import Sortable from '../DndKit/Sortable';
import SortableVerticalListContext from '../DndKit/SortableVerticalListContext';
import { ServerDetailsModal } from '../Modals';
import TitleWithIcon from '../TitleWithIcon';
import ServerListItem from './ServerListItem';

function ServerList({ servers }) {
  const { selectedServer, setSelectedServer, saveServers } = useServers();
  const theme = useTheme();

  const handleClose = () => {
    setSelectedServer(null);
  };

  function renderServers() {
    return servers.map((server) => {
      const onClick = () => {
        setSelectedServer(server);
      };

      return (
        <Sortable id={server.queryConnect} key={server.queryConnect}>
          <ServerListItem onClick={onClick} server={server} />
        </Sortable>
      );
    });
  }

  const renderIcon = (defaultStyles) => (
    <StorageIcon
      sx={{
        ...defaultStyles,
      }}
    />
  );

  const handleDragEnd = async (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      const oldIndex = servers.findIndex(
        (item) => item.queryConnect === active.id,
      );

      const newIndex = servers.findIndex(
        (item) => item.queryConnect === over.id,
      );

      const newOrder = arrayMove(servers, oldIndex, newIndex);

      saveServers({ serverList: newOrder });
    }
  };

  return (
    <>
      <ServerDetailsModal server={selectedServer} handleClose={handleClose} />
      <Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: theme.spacing(2),
          }}
        >
          <TitleWithIcon
            title="SERVERS - Click on a server to view details"
            renderIcon={renderIcon}
          />
        </Box>
        <SortableVerticalListContext
          handleDragEnd={handleDragEnd}
          items={servers.map((server) => server.queryConnect)}
        >
          <List role="list">{renderServers()}</List>
        </SortableVerticalListContext>
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
