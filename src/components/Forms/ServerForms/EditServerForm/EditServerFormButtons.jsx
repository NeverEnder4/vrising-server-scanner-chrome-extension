import React from 'react';

import { Button } from '@mui/material';
import PropTypes from 'prop-types';

import useServers from '../../../../hooks/useServers';
import FormButtons from '../../FormButtons';

function EditServerFormButtons({
  editMode, loading, toggleEditMode, closeModal,
}) {
  const { selectedServer, deleteServer } = useServers();

  const handleDelete = async () => {
    await deleteServer({ connectionString: selectedServer?.connect });
    if (closeModal) closeModal();
  };

  const rightButton = (
    <Button
      onClick={editMode ? undefined : toggleEditMode}
      type={editMode ? 'submit' : 'button'}
      variant="contained"
      color={editMode ? 'primary' : 'secondary'}
      disabled={loading}
    >
      {editMode ? 'SAVE' : 'EDIT'}
    </Button>
  );

  const leftButton = (
    <Button
      onClick={handleDelete}
      type="button"
      variant="outlined"
      color="primary"
      disabled={loading}
    >
      DELETE SERVER

    </Button>
  );

  return <FormButtons leftButton={leftButton} rightButton={rightButton} />;
}
EditServerFormButtons.defaultProps = {
  editMode: false,
  loading: false,
  toggleEditMode: undefined,
  closeModal: undefined,
};
EditServerFormButtons.propTypes = {
  editMode: PropTypes.bool,
  loading: PropTypes.bool,
  toggleEditMode: PropTypes.func,
  closeModal: PropTypes.func,
};
export default EditServerFormButtons;
