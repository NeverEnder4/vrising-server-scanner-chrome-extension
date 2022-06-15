import React from 'react';

import { Typography } from '@mui/material';
import PropTypes from 'prop-types';

function Label({ htmlFor, label }) {
  return (
    <Typography variant="body2" component="label" htmlFor={htmlFor}>
      {label}
    </Typography>
  );
}

Label.propTypes = {
  htmlFor: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

export default Label;
