import React from 'react';

import { ListItemText, useTheme } from '@mui/material';
import PropTypes from 'prop-types';

function ServerListItemText({ primary, secondary }) {
  const theme = useTheme();

  const secondaryTypographyProps = {
    sx: {
      color: theme.palette.secondary.light,
      fontWeight: 'bold',
      fontSize: 12,
    },
  };
  const primaryTypographyProps = {
    sx: {
      color: theme.palette.common.white, fontWeight: 'bold', fontSize: 12,
    },
  };

  return (
    <ListItemText
      sx={{
        flexGrow: 0, display: 'flex', flexDirection: 'column', alignItems: 'center',
      }}
      primaryTypographyProps={primaryTypographyProps}
      secondaryTypographyProps={secondaryTypographyProps}
      primary={primary}
      secondary={secondary}
    />
  );
}

ServerListItemText.propTypes = {
  primary: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  secondary: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default ServerListItemText;
