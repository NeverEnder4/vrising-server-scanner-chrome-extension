import React, { useState, useRef, useEffect } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { Grid } from '@mui/material';
import PropTypes from 'prop-types';
import { Controller, useForm } from 'react-hook-form';

import useServers from '../../../hooks/useServers';
import serverString from '../../../utils/serverString';
import {
  TextInput, NumberInput, TextArea, HelperText,
} from '../../Inputs';
import getSchema from './schema';
import ServerFormButtons from './ServerFormButtons';

const NICKNAME_MAX_LENGTH = 20;
const NOTES_MAX_LENGTH = 140;

function AddServerForm({
  onSubmit, loading, apiError, edit, closeModal,
}) {
  const [editMode, setEditMode] = useState(false);
  const { selectedServer } = useServers();

  const firstInputRef = useRef();

  const schema = getSchema({ NICKNAME_MAX_LENGTH, NOTES_MAX_LENGTH });

  useEffect(() => {
    // Focus first input when edit button is clicked
    if (editMode) firstInputRef.current.focus();
  }, [editMode]);

  function getDefaultValues({ server }) {
    const { hostIp, queryPort } = serverString.parse({ server: server?.queryConnect });

    return {
      hostIp,
      queryPort,
      nickname: server?.nickname,
      notes: server?.notes,
    };
  }

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: edit ? getDefaultValues({ server: selectedServer }) : undefined,
  });

  const toggleEditMode = (e) => {
    e.preventDefault();
    setEditMode(!editMode);
  };

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
                disabled={loading || (edit && !editMode)}
                error={!!errors.hostIp}
                helperText={errors.hostIp?.message}
                ref={firstInputRef}
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
                disabled={loading || (edit && !editMode)}
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
                disabled={loading || (edit && !editMode)}
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
                disabled={loading || (edit && !editMode)}
                error={!!errors.notes}
                helperText={errors.notes?.message}
              />
            )}
          />
        </Grid>
      </Grid>
      <ServerFormButtons
        edit={edit}
        editMode={editMode}
        loading={loading}
        toggleEditMode={toggleEditMode}
        closeModal={closeModal}
      />
      <HelperText helperText={apiError} error={!!apiError} />
    </form>
  );
}

AddServerForm.defaultProps = {
  apiError: '',
  onSubmit: undefined,
  edit: false,
  closeModal: undefined,
};

AddServerForm.propTypes = {
  onSubmit: PropTypes.func,
  loading: PropTypes.bool.isRequired,
  apiError: PropTypes.string,
  edit: PropTypes.bool,
  closeModal: PropTypes.func,
};

export default AddServerForm;
