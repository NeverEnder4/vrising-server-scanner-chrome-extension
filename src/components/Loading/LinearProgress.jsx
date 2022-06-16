import React from 'react';

import {
  LinearProgress as MuiLinearProgress,
} from '@mui/material';
import PropTypes from 'prop-types';

function LinearProgress({
  loading, position, top, bottom, left, right, width, color,
}) {
  if (!loading) return null;
  return (
    <MuiLinearProgress
      sx={{
        position,
        top,
        bottom,
        left,
        right,
        width,
      }}
      color={color}
    />
  );
}

LinearProgress.defaultProps = {
  position: undefined,
  top: undefined,
  bottom: undefined,
  left: undefined,
  right: undefined,
  width: '100%',
  color: 'secondary',
};

LinearProgress.propTypes = {
  loading: PropTypes.bool.isRequired,
  position: PropTypes.string,
  top: PropTypes.number,
  bottom: PropTypes.number,
  left: PropTypes.number,
  right: PropTypes.number,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  color: PropTypes.string,

};

export default LinearProgress;
