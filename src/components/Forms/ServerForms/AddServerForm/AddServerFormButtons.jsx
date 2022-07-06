import React from 'react';

import { Button } from '@mui/material';
import PropTypes from 'prop-types';

import FormButtons from '../../FormButtons';

function AddServerFormButtons({
  loading,
}) {
  const rightButton = (
    <Button
      type="submit"
      variant="contained"
      color="primary"
      disabled={loading}
      sx={{ marginLeft: 'auto' }}
    >
      SAVE
    </Button>
  );

  return <FormButtons rightButton={rightButton} />;
}
AddServerFormButtons.defaultProps = {
  loading: false,
};

AddServerFormButtons.propTypes = {
  loading: PropTypes.bool,
};

export default AddServerFormButtons;
