import React from 'react';

import PropTypes from 'prop-types';

export function TestWrapper({ children, Provider }) {
  return <Provider>{children}</Provider>;
}

TestWrapper.propTypes = {
  children: PropTypes.element.isRequired,
  Provider: PropTypes.element.isRequired,
};

export default TestWrapper;
