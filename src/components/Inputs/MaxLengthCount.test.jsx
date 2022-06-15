import React from 'react';

import { render, screen } from '@testing-library/react';

import MaxLengthCount from './MaxLengthCount';

describe('MaxLengthCount component', () => {
  const MAX_LENGTH = 10;
  const VALUE = 'Test';
  const COUNT = `${VALUE.length}/${MAX_LENGTH}`;

  it('renders the correct count', () => {
    render(
      <MaxLengthCount maxLength={MAX_LENGTH} valueLength={VALUE.length} />,
    );

    expect(screen.getByText(COUNT)).toBeInTheDocument();
  });
});
