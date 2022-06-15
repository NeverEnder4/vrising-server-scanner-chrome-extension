import React, { useState } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import {
  Box, Grid, Button, useTheme, LinearProgress,
} from '@mui/material';
import PropTypes from 'prop-types';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';

import {
  TextInput,
  NumberInput,
  TextArea,
  HelperText,
} from '../../../components/Inputs';
import chromeStorage from '../../../utils/chromeStorage';
import serverScanner from '../../../utils/serverScanner';
import AddServerFormHeader from './AddServerFormHeader';

const NICKNAME_MAX_LENGTH = 20;
const NOTES_MAX_LENGTH = 140;

const schema = yup.object().shape({
  nickname: yup.string().max(NICKNAME_MAX_LENGTH),
  hostIp: yup.string().required('Required'),
  queryPort: yup.number().typeError('Required').required('Required'),
  notes: yup.string().max(NOTES_MAX_LENGTH),
});

function AddServerForm({ handleCloseModal, titleId }) {
  const theme = useTheme();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  async function onSubmit(data) {
    setError(null);
    setLoading(true);

    const server = `${data.hostIp}:${data.queryPort}`;

    const alreadySavedServer = await chromeStorage.getServer({ server });

    // If server already exists in storage, set error to let user know
    if (alreadySavedServer) {
      setError(`${server} has already been saved to your list.`);
    } else {
      const [serverResult] = await serverScanner.get({
        serverList: [server],
      });

      // If server is not found, set error, let user know else save the server
      if (serverResult === null) {
        setError(
          'Unable to find server, please make sure the host IP and query port are correct.',
        );
      } else {
        const servers = await chromeStorage.getAllServers();
        const newServer = {
          ...serverResult,
          nickname: data?.nickname,
          notes: data?.notes,
          queryConnect: server,
        };
        await chromeStorage.set({ keys: { servers: [...servers, newServer] } });
        handleCloseModal();
      }
    }

    setLoading(false);
  }

  return (
    <Box
      sx={{
        padding: theme.spacing(2, 3),
        backgroundColor: theme.palette.grey[800],
        width: 350,
        position: 'relative',
      }}
    >
      <AddServerFormHeader titleId={titleId} closeModal={handleCloseModal} />
      <form
        style={{
          marginTop: theme.spacing(3),
          display: 'flex',
          flexDirection: 'column',
        }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <Controller
              name="hostIp"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextInput
                  {...field}
                  label="Host IP*"
                  id="host-ip-input"
                  disabled={loading}
                  error={!!errors.hostIp}
                  helperText={errors.hostIp?.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={4}>
            <Controller
              name="queryPort"
              control={control}
              defaultValue={undefined}
              render={({ field }) => (
                <NumberInput
                  {...field}
                  disableKeypressStep
                  label="Query Port*"
                  id="query-port-input"
                  min={0}
                  disabled={loading}
                  error={!!errors.queryPort}
                  helperText={errors.queryPort?.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="nickname"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextInput
                  {...field}
                  label="Nickname"
                  id="nickname-input"
                  maxLength={NICKNAME_MAX_LENGTH}
                  disabled={loading}
                  error={!!errors.nickname}
                  helperText={errors.nickname?.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="notes"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextArea
                  {...field}
                  label="Notes"
                  id="server-notes-input"
                  maxLength={NOTES_MAX_LENGTH}
                  disabled={loading}
                  error={!!errors.notes}
                  helperText={errors.notes?.message}
                />
              )}
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={loading}
          sx={{
            marginLeft: 'auto',
            marginTop: theme.spacing(3),
            marginBottom: theme.spacing(2),
          }}
        >
          SAVE
        </Button>
        <HelperText helperText={error} error={error} />
      </form>
      {loading && (
        <LinearProgress
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
          }}
          color="secondary"
        />
      )}
    </Box>
  );
}

AddServerForm.defaultProps = {
  handleCloseModal: undefined,
  titleId: undefined,
};

AddServerForm.propTypes = {
  handleCloseModal: PropTypes.func,
  titleId: PropTypes.string,
};

export default AddServerForm;
