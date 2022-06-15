import React, { useState } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import {
  Box, Grid, Button, useTheme,
} from '@mui/material';
import PropTypes from 'prop-types';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';

import { TextInput, NumberInput, TextArea } from '../../../components/Inputs';
// import chromeStorage from '../../../utils/chromeStorage';
// import serverScanner from '../../../utils/serverScanner';
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
  const [error] = useState(null);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  async function onSubmit(data) {
    console.log(data);
    setLoading(true);
    // Use server scanner util to find server
    // const server = `${data.hostIp}:${data.queryPort}`;

    // const alreadySavedServer = await chromeStorage.getServers({ serverList: [server] });

    // console.log(alreadySavedServer, 'AL SAVED SERV');

    // const [serverResult] = await serverScanner.get({
    //   serverList: [server],
    // });
    // console.log(serverResult, 'RESULT');
    // // If server is found, save it using chrome storage util
    // if (serverResult === null) {
    //   setError(
    //     'Unable to find server, please make sure the host IP and query port are correct.',
    //   );
    // } else {
    //   await chromeStorage.set({ keyValueMap: { servers: [server] } });
    // }
    // setLoading(false);
  }

  console.log(loading, error, 'LOADING');

  return (
    <Box
      sx={{
        padding: theme.spacing(2, 3),
        backgroundColor: theme.palette.grey[800],
        width: 350,
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
          sx={{
            marginLeft: 'auto',
            marginTop: theme.spacing(3),
            marginBottom: theme.spacing(2),
          }}
        >
          SAVE
        </Button>
      </form>
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
