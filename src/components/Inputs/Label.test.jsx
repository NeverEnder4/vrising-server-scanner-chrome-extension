import React from 'react';

import { render, screen } from '@testing-library/react';

import Label from './Label';

describe('Label component', () => {
  const HTML_FOR = 'input';
  const LABEL = 'My Input';

  it('renders the component', () => {
    render(<Label htmlFor={HTML_FOR} label={LABEL} />);

    expect(screen.getByText(LABEL)).toBeInTheDocument();
  });
});
