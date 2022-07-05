import React from 'react';

import { Box, Typography, useTheme } from '@mui/material';
import PropTypes from 'prop-types';

const ICON_SIZE = 16;

function TitleWithIcon({ title, renderIcon }) {
  const theme = useTheme();
  const icon = renderIcon({
    fill: theme.palette.secondary.light,
    width: ICON_SIZE,
    height: ICON_SIZE,
    marginRight: theme.spacing(1),
  });

  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
      {icon}
      <Typography fontSize={14} fontWeight="bold" color={theme.palette.secondary.light} vairant="h1">{title}</Typography>
    </Box>
  );
}

TitleWithIcon.propTypes = {
  title: PropTypes.string.isRequired,
  renderIcon: PropTypes.func.isRequired,
};

export default TitleWithIcon;
