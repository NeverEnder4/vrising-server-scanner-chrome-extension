import React from 'react';

import {
  Box, useTheme,
} from '@mui/material';
import PropTypes from 'prop-types';

import CloseButton from '../../CloseButton';
import TitleWithIcon from '../../TitleWithIcon';

const DEFAULT_ICON_SIZE = 14;

function ModalHeader({ title, renderIcon, handleClose }) {
  const theme = useTheme();

  const renderStyledIcon = typeof renderIcon === 'function'
    ? () => renderIcon({
      fill: theme.palette.secondary.light,
      width: DEFAULT_ICON_SIZE,
      height: DEFAULT_ICON_SIZE,
      marginRight: theme.spacing(1),
    })
    : undefined;

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: theme.palette.common.black,
        padding: theme.spacing(2, 3),
      }}
    >
      <TitleWithIcon title={title} renderIcon={renderStyledIcon} />
      <CloseButton handleClose={handleClose} />
    </Box>
  );
}

ModalHeader.defaultProps = {
  renderIcon: undefined,
};

ModalHeader.propTypes = {
  title: PropTypes.string.isRequired,
  renderIcon: PropTypes.func,
  handleClose: PropTypes.func.isRequired,
};

export default ModalHeader;
