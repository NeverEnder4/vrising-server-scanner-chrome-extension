import React from 'react';

import { render } from '@testing-library/react';

import LinearProgress from './LinearProgress';

describe('AddServerForm component', () => {
  it('renders when `loading` prop is true', () => {
    const { queryByRole } = render(
      <LinearProgress loading />,
    );

    expect(queryByRole('progressbar')).toBeInTheDocument();
  });

  it('does not render when `loading` prop is false', () => {
    const { queryByRole } = render(
      <LinearProgress loading={false} />,
    );

    expect(queryByRole('progressbar')).not.toBeInTheDocument();
  });
});
