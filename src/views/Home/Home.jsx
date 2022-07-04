import React from 'react';

import { Box, useTheme } from '@mui/material';

import AnimatedViewCover from '../../components/Loading/AnimatedViewCover';
import { AddServerButtonModal } from '../../components/Modals';
import ServerList from '../../components/ServerList';
import useServers from '../../hooks/useServers';
import PopupLayout from '../../layouts/PopupLayout';
import NoServersFound from './NoServersFound';

function Home() {
  const theme = useTheme();
  const { servers, loading } = useServers();

  function renderContent() {
    console.log(servers, 'SERVERS');
    if (!servers) return null;
    if (servers.length) return <ServerList servers={servers} />;
    return <NoServersFound />;
  }

  return (
    <PopupLayout>
      <>
        <AnimatedViewCover loading={loading} />
        <Box sx={{ padding: theme.spacing(2, 3) }}>
          {renderContent()}
          <AddServerButtonModal />
        </Box>
      </>
    </PopupLayout>
  );
}

export default Home;
