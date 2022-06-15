import React from 'react';

import { Box, useTheme } from '@mui/material';

import { HEADER_HEIGHT } from './constant';
import HeaderButtons from './HeaderButtons';
import HeaderText from './HeaderText';

export function Header() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.common.black,
        boxShadow: theme.shadows[1],
        height: HEADER_HEIGHT,
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: theme.spacing(1, 2),
      }}
    >
      <HeaderText />
      <HeaderButtons />
    </Box>
  );
}

export default Header;
