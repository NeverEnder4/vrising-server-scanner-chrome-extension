import React, { forwardRef, useEffect, useCallback } from 'react';

import { Box } from '@mui/material';
import PropTypes from 'prop-types';

import HelperText from './HelperText';
import Label from './Label';
import useInputStyles from './useInputStyles';

const NumberInput = forwardRef(
  (
    {
      value,
      onChange,
      onBlur,
      id,
      name,
      label,
      error,
      helperText,
      disableKeypressStep,
      max,
      min,
      step,
    },
    ref,
  ) => {
    const inputStyles = useInputStyles();
    const inputElement = document.getElementById(id);

    const preventStep = useCallback((e) => {
      if (e.keyCode === 38 || e.keyCode === 40) {
        e.preventDefault();
      }
    });

    useEffect(() => {
      if (inputElement && disableKeypressStep) {
        inputElement.addEventListener('keydown', preventStep);
      }

      return () => {
        if (inputElement && disableKeypressStep) {
          inputElement.removeEventListener('keydown', preventStep);
        }
      };
    }, [inputElement, disableKeypressStep, preventStep]);

    return (
      <Box>
        <Label htmlFor={id} label={label} />
        <input
          style={inputStyles}
          id={id}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          name={name}
          ref={ref}
          type="number"
          max={max}
          min={min}
          step={step}
        />
        <HelperText helperText={helperText} error={error} />
      </Box>
    );
  },
);

NumberInput.defaultProps = {
  value: undefined,
  helperText: '',
  error: false,
  disableKeypressStep: false,
  max: undefined,
  min: undefined,
  step: 'any',
};

NumberInput.propTypes = {
  value: PropTypes.number,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  error: PropTypes.bool,
  helperText: PropTypes.string,
  disableKeypressStep: PropTypes.bool,
  max: PropTypes.number,
  min: PropTypes.number,
  step: PropTypes.string,
};

export default NumberInput;
