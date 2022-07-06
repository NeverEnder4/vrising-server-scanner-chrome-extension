import React from 'react';

import { Button } from '@mui/material';
import PropTypes from 'prop-types';

import useServers from '../../../hooks/useServers';
import FormButtons from '../FormButtons';

function ServerFormButtons({
  edit, editMode, loading, toggleEditMode, closeModal,
}) {
  const { selectedServer, deleteServer } = useServers();

  const handleDelete = async () => {
    await deleteServer({ connectionString: selectedServer?.connect });
    console.log(closeModal, 'TEST CLOSE');
    if (closeModal) closeModal();
  };

  const rightButton = (
    <Button
      onClick={edit && !editMode ? toggleEditMode : undefined}
      type={!edit || editMode ? 'submit' : 'button'}
      variant="contained"
      color={!edit || editMode ? 'primary' : 'secondary'}
      disabled={loading}
    >
      {!edit || editMode ? 'SAVE' : 'EDIT'}
    </Button>
  );

  const leftButton = edit ? (
    <Button
      onClick={handleDelete}
      type="button"
      variant="outlined"
      color="primary"
      disabled={loading}
    >
      DELETE SERVER

    </Button>
  ) : null;

  return <FormButtons leftButton={leftButton} rightButton={rightButton} />;
}
ServerFormButtons.defaultProps = {
  edit: false,
  editMode: false,
  loading: false,
  toggleEditMode: undefined,
  closeModal: undefined,
};
ServerFormButtons.propTypes = {
  edit: PropTypes.bool,
  editMode: PropTypes.bool,
  loading: PropTypes.bool,
  toggleEditMode: PropTypes.func,
  closeModal: PropTypes.func,
};
export default ServerFormButtons;
