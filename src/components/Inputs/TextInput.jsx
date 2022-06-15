import React, { forwardRef } from 'react';

import { Box } from '@mui/material';
import PropTypes from 'prop-types';

import HelperText from './HelperText';
import LabelWithCount from './LabelWithCount';
import useInputStyles from './useInputStyles';

const TextInput = forwardRef(
  (
    {
      value, onChange, onBlur, id, name, label, error, helperText, maxLength,
    },
    ref,
  ) => {
    const inputStyles = useInputStyles();

    return (
      <Box>
        <LabelWithCount
          htmlFor={id}
          label={label}
          maxLength={maxLength}
          valueLength={value.length}
        />
        <input
          type="text"
          style={inputStyles}
          id={id}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          name={name}
          maxLength={maxLength}
          ref={ref}
        />
        <HelperText helperText={helperText} error={error} />
      </Box>
    );
  },
);

TextInput.defaultProps = {
  value: '',
  helperText: '',
  error: false,
  maxLength: undefined,
};

TextInput.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  error: PropTypes.bool,
  helperText: PropTypes.string,
  maxLength: PropTypes.number,
};

export default TextInput;
