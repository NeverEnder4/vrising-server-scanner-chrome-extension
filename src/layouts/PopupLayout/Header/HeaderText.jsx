import React, { useCallback } from 'react';

import {
  Box, ButtonBase, Typography, useTheme,
} from '@mui/material';

import useNavigation from '../../../hooks/useNavigation';
import viewNames from '../../../views/viewNames';
import { HEADER_TITLE, HEADER_DESCRIPTION } from './constant';

function HeaderText() {
  const theme = useTheme();
  const { navigate } = useNavigation();

  const onTitleClick = useCallback(() => {
    navigate({ view: viewNames.HOME });
  }, [viewNames.HOME]);

  return (
    <Box
      sx={{
        width: 300,
      }}
    >
      <ButtonBase
        onClick={onTitleClick}
        sx={{
          color: theme.palette.primary.main,
          fontSize: 18,
          fontFamily: 'Paytone One, sans-serif',
          marginBottom: theme.spacing(0.5),
          fontWeight: 'bold',
          letterSpacing: 1,
        }}
      >
        {HEADER_TITLE}
      </ButtonBase>
      <Typography variant="body2">{HEADER_DESCRIPTION}</Typography>
    </Box>
  );
}

export default HeaderText;
