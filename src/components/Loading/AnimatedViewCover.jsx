import React from 'react';

import { Box, useTheme } from '@mui/material';
import PropTypes from 'prop-types';

import { HEADER_HEIGHT } from '../../layouts/PopupLayout/Header/constant';
import AnimatedLogo from './AnimatedLogo';

function AnimatedViewCover({ loading }) {
  const theme = useTheme(loading);

  if (loading) {
    return (
      <Box
        sx={{
          position: 'absolute',
          left: 0,
          top: HEADER_HEIGHT,
          right: 0,
          bottom: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: `${theme.palette.common.black}AA`,
          zIndex: theme.zIndex.appBar,
          width: '100%',
        }}
      >
        <AnimatedLogo size={120} />
      </Box>
    );
  }

  return null;
}

AnimatedViewCover.defaultProps = {
  loading: true,
};

AnimatedViewCover.propTypes = {
  loading: PropTypes.bool,
};

export default AnimatedViewCover;
