import React from 'react';

import { render, screen } from '@testing-library/react';

import HeaderButtons from './HeaderButtons';

describe('HeaderText component', () => {
  it('renders settings icon button', () => {
    render(<HeaderButtons />);
    expect(screen.getByLabelText('Settings')).toBeInTheDocument();
  });

  it('renders refresh icon button', () => {
    render(<HeaderButtons />);
    expect(screen.getByLabelText('Refresh')).toBeInTheDocument();
  });
});
