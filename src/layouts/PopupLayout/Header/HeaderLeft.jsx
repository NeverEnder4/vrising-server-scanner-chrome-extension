import React, { useCallback } from 'react';

import {
  Box, ButtonBase, Typography, useTheme,
} from '@mui/material';

import { ReactComponent as Logo } from '../../../assets/svg/logo-48.svg';
import useNavigation from '../../../hooks/useNavigation';
import viewNames from '../../../views/viewNames';
import { HEADER_TITLE, HEADER_DESCRIPTION } from './constant';

function HeaderText() {
  const theme = useTheme();
  const { navigate } = useNavigation();

  const onTitleClick = useCallback(() => {
    navigate({ view: viewNames.HOME });
  }, [viewNames.HOME]);

  const typographyStyles = {
    fontFamily: 'Paytone One, sans-serif',
    fontWeight: 'bold',
    letterSpacing: 1,
  };

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
          marginBottom: theme.spacing(0.5),
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Logo />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            textAlign: 'left',
            marginLeft: theme.spacing(1),
            height: 52,
          }}
        >
          <Typography
            sx={{
              ...typographyStyles,
              fontSize: 30,
              color: theme.palette.primary.main,
              lineHeight: 0.8,
            }}
            variant="body2"
          >
            {HEADER_TITLE}
          </Typography>
          <Typography
            sx={{ ...typographyStyles, fontSize: 16, lineHeight: 1.5 }}
            variant="body2"
          >
            {HEADER_DESCRIPTION}
          </Typography>
        </Box>
      </ButtonBase>
    </Box>
  );
}

export default HeaderText;
