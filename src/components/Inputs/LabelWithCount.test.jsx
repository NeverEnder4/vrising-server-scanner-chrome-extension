import React from 'react';

import { render, screen } from '@testing-library/react';

import LabelWithCount from './LabelWithCount';

describe('MaxLengthCount component', () => {
  const MAX_LENGTH = 10;
  const VALUE = 'Test';
  const COUNT = `${VALUE.length}/${MAX_LENGTH}`;
  const LABEL = 'Name*';
  const HTML_FOR = 'name-input';

  it('renders the correct count with label', () => {
    render(
      <LabelWithCount
        label={LABEL}
        htmlFor={HTML_FOR}
        maxLength={MAX_LENGTH}
        valueLength={VALUE.length}
      />,
    );

    expect(screen.getByText(COUNT)).toBeInTheDocument();
    expect(screen.getByText(LABEL)).toBeInTheDocument();
  });

  it('only renders label when `maxLength` prop is falsy', () => {
    const { queryByText } = render(
      <LabelWithCount
        label={LABEL}
        htmlFor={HTML_FOR}
        valueLength={VALUE.length}
      />,
    );

    expect(queryByText(COUNT)).toBeNull();
    expect(screen.getByText(LABEL)).toBeInTheDocument();
  });
});
