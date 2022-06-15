import React from 'react';

import { Box } from '@mui/material';
import PropTypes from 'prop-types';

import Label from './Label';
import MaxLengthCount from './MaxLengthCount';

function LabelWithCount({
  htmlFor, label, maxLength, valueLength,
}) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <Label htmlFor={htmlFor} label={label} />
      {maxLength && <MaxLengthCount maxLength={maxLength} valueLength={valueLength} />}
    </Box>
  );
}

LabelWithCount.defaultProps = {
  maxLength: undefined,
};

LabelWithCount.propTypes = {
  htmlFor: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  valueLength: PropTypes.number.isRequired,
  maxLength: PropTypes.number,
};

export default LabelWithCount;
