import React from 'react';

import { render, screen } from '@testing-library/react';

import { HEADER_TITLE, HEADER_DESCRIPTION } from './constant';
import HeaderText from './HeaderText';

describe('HeaderText component', () => {
  it('renders correct title text', () => {
    render(<HeaderText />);
    expect(screen.getByText(HEADER_TITLE)).toBeInTheDocument();
  });

  it('renders correct description text', () => {
    render(<HeaderText />);
    expect(screen.getByText(HEADER_DESCRIPTION)).toBeInTheDocument();
  });
});
