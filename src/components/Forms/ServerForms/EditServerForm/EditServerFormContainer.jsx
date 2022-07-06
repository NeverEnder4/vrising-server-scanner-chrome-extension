import React, { useState, useCallback } from 'react';

import SettingsIcon from '@mui/icons-material/Settings';
import { Box, useTheme } from '@mui/material';
import PropTypes from 'prop-types';

import useServers from '../../../../hooks/useServers';
import LinearProgress from '../../../Loading/LinearProgress';
import TitleWithIcon from '../../../TitleWithIcon';
import EditServerForm from './EditServerForm';

function EditServerFormContainer({ handleCloseModal, title }) {
  const theme = useTheme();
  const { loadFromStorage, selectedServer, editServer } = useServers();
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState(null);

  const onSubmit = useCallback(
    async (data) => {
      setApiError(null);
      setLoading(true);

      const update = { nickname: data?.nickname, notes: data?.notes };
      await editServer({ server: selectedServer, update });

      setLoading(false);
      loadFromStorage();
    },
    [setApiError, setLoading],
  );

  const renderIcon = (defaultStyles) => (
    <SettingsIcon sx={{ ...defaultStyles }} />
  );

  return (
    <Box
      sx={{
        padding: theme.spacing(3, 3),
        backgroundColor: theme.palette.grey[800],
        width: 350,
        position: 'relative',
      }}
    >
      {title && <TitleWithIcon title="Settings" renderIcon={renderIcon} />}
      <Box sx={{ paddingTop: title ? theme.spacing(3) : undefined }}>
        <EditServerForm
          onSubmit={onSubmit}
          loading={loading}
          apiError={apiError}
          closeModal={handleCloseModal}
        />
      </Box>
      <LinearProgress
        loading={loading}
        position="absolute"
        bottom={0}
        left={0}
        width="100%"
      />
    </Box>
  );
}

EditServerFormContainer.defaultProps = {
  handleCloseModal: undefined,
  title: false,
};

EditServerFormContainer.propTypes = {
  handleCloseModal: PropTypes.func,
  title: PropTypes.bool,
};

export default EditServerFormContainer;
