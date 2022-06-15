import React from 'react';

import { Fab, Zoom, useTheme } from '@mui/material';
import PropTypes from 'prop-types';

function ZoomFab({
  visible,
  color,
  ariaLabel,
  renderIcon,
  onClick,
  position,
  size,
}) {
  const theme = useTheme();

  const transitionDuration = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen,
  };

  function getFabPositionStyles({ position: fabPosition, theme: muiTheme }) {
    const SPACING = muiTheme.spacing(3);
    const styles = { position: 'absolute', bottom: SPACING };

    switch (fabPosition) {
      case 'bottomRight':
        styles.right = SPACING;
        return styles;
      case 'bottomLeft':
        styles.left = SPACING;
        return styles;
      default:
        styles.right = SPACING;
        return styles;
    }
  }

  const positionStyles = getFabPositionStyles({ position, theme });

  return (
    <Zoom
      in={visible}
      timeout={transitionDuration}
      style={{
        transitionDelay: `${transitionDuration.exit}ms`,
      }}
      unmountOnExit
    >
      <Fab
        onClick={onClick}
        color={color}
        sx={{ ...positionStyles, height: size, width: size }}
        aria-label={ariaLabel}
      >
        {renderIcon()}
      </Fab>
    </Zoom>
  );
}

ZoomFab.defaultProps = {
  position: 'bottomRight',
  size: 50,
};

ZoomFab.propTypes = {
  visible: PropTypes.bool.isRequired,
  color: PropTypes.string.isRequired,
  ariaLabel: PropTypes.string.isRequired,
  renderIcon: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  position: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

export default ZoomFab;
