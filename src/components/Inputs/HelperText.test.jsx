import React from 'react';

import { render, screen } from '@testing-library/react';

import HelperText from './HelperText';

describe('HelperText component', () => {
  const HELPER_TEXT = 'Host IP is a required field';

  it('renders the component', () => {
    render(<HelperText error helperText={HELPER_TEXT} />);

    expect(screen.getByText(HELPER_TEXT)).toBeInTheDocument();
  });

  it('does not render `error` prop is falsy', () => {
    const { queryByText } = render(
      <HelperText error={false} helperText={HELPER_TEXT} />,
    );

    expect(queryByText(HELPER_TEXT)).toBeNull();
  });
});
