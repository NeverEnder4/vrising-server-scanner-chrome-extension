import React, { useState, useRef, useEffect } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { Grid } from '@mui/material';
import PropTypes from 'prop-types';
import { Controller, useForm } from 'react-hook-form';

import useServers from '../../../../hooks/useServers';
import { TextInput, TextArea, HelperText } from '../../../Inputs';
import EditServerFormButtons from './EditServerFormButtons';
import getSchema from './schema';

const NICKNAME_MAX_LENGTH = 20;
const NOTES_MAX_LENGTH = 140;

function EditServerForm({
  onSubmit, loading, apiError, closeModal,
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
    return {
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
    defaultValues: getDefaultValues({ server: selectedServer }),
  });

  const toggleEditMode = (e) => {
    e.preventDefault();
    setEditMode(!editMode);
  };

  console.log(control, 'CONTROL');

  return (
    <form
      style={{
        display: 'flex',
        flexDirection: 'column',
      }}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Grid container spacing={2}>
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
                disabled={loading || !editMode}
                error={!!errors.nickname}
                helperText={errors.nickname?.message}
                ref={firstInputRef}
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
                disabled={loading || !editMode}
                error={!!errors.notes}
                helperText={errors.notes?.message}
              />
            )}
          />
        </Grid>
      </Grid>
      <EditServerFormButtons
        editMode={editMode}
        loading={loading}
        toggleEditMode={toggleEditMode}
        closeModal={closeModal}
      />
      <HelperText helperText={apiError} error={!!apiError} formPosition="bottom" />
    </form>
  );
}

EditServerForm.defaultProps = {
  apiError: '',
  onSubmit: undefined,
  edit: false,
  closeModal: undefined,
};

EditServerForm.propTypes = {
  onSubmit: PropTypes.func,
  loading: PropTypes.bool.isRequired,
  apiError: PropTypes.string,
  edit: PropTypes.bool,
  closeModal: PropTypes.func,
};

export default EditServerForm;
