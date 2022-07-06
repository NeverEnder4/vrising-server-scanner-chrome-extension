import React from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { Grid } from '@mui/material';
import PropTypes from 'prop-types';
import { Controller, useForm } from 'react-hook-form';

import {
  TextInput, NumberInput, TextArea, HelperText,
} from '../../../Inputs';
import AddServerFormButtons from './AddServerFormButtons';
import getSchema from './schema';

const NICKNAME_MAX_LENGTH = 20;
const NOTES_MAX_LENGTH = 140;

function AddServerForm({ onSubmit, loading, apiError }) {
  const schema = getSchema({ NICKNAME_MAX_LENGTH, NOTES_MAX_LENGTH });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  return (
    <form
      style={{
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
      <AddServerFormButtons loading={loading} />
      <HelperText helperText={apiError} error={!!apiError} formPosition="bottom" />
    </form>
  );
}

AddServerForm.defaultProps = {
  apiError: '',
  onSubmit: undefined,
  closeModal: undefined,
};

AddServerForm.propTypes = {
  onSubmit: PropTypes.func,
  loading: PropTypes.bool.isRequired,
  apiError: PropTypes.string,
  closeModal: PropTypes.func,
};

export default AddServerForm;
