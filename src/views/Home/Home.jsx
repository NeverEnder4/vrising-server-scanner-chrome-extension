import React, { useCallback } from 'react';

import AddIcon from '@mui/icons-material/Add';
import { Box, useTheme } from '@mui/material';

import ZoomFab from '../../components/Fab';
import AnimatedViewCover from '../../components/Loading/AnimatedViewCover';
import ButtonModal from '../../components/Modal';
import ServerList from '../../components/ServerList';
import useNavigation from '../../hooks/useNavigation';
import useServers from '../../hooks/useServers';
import PopupLayout from '../../layouts/PopupLayout';
import viewNames from '../viewNames';
import AddServerForm from './AddServerForm';
import FAB_DIAMETER from './constant';
import NoServersFound from './NoServersFound';

const ICON_DIMENSION = 32;
const MODAL_TITLE = 'Add Server Form';
const MODAL_DESCRIPTION = 'Add a V Rising server using this form';

function Home() {
  const theme = useTheme();
  const { currentView } = useNavigation();
  const { servers, loading } = useServers();

  const renderIcon = useCallback(() => (
    <AddIcon
      sx={{
        fill: theme.palette.common.white,
        width: ICON_DIMENSION,
        height: ICON_DIMENSION,
      }}
    />
  ));

  const renderOpenButton = useCallback(({ handleOpenModal }) => (
    <ZoomFab
      visible={currentView === viewNames.HOME}
      onClick={handleOpenModal}
      color="primary"
      position="bottomRight"
      size={FAB_DIAMETER}
      ariaLabel="Add Server Button"
      renderIcon={renderIcon}
    />
  ));

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
          <ButtonModal
            renderOpenButton={renderOpenButton}
            ariaLabeledBy={MODAL_TITLE}
            ariaDescribedBy={MODAL_DESCRIPTION}
          >
            <AddServerForm
              titleId={MODAL_TITLE}
              descriptionId={MODAL_DESCRIPTION}
            />
          </ButtonModal>
        </Box>
      </>
    </PopupLayout>
  );
}

export default Home;
