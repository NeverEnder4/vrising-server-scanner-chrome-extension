import React from 'react';

import {
  render, screen, waitFor, fireEvent,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import NumberInput from './NumberInput';

describe('NumberInput component', () => {
  const mockOnChange = jest.fn();
  const mockOnBlur = jest.fn();
  const ID = 'query-port-input';
  const LABEL = 'Query Port*';
  const VALUE = 12334;
  const NAME = 'queryPort';

  it('renders the correct components', () => {
    render(
      <NumberInput
        name={NAME}
        value={VALUE}
        onChange={mockOnChange}
        onBlur={mockOnBlur}
        id={ID}
        label={LABEL}
      />,
    );

    expect(screen.getByText(LABEL)).toBeInTheDocument();
    expect(screen.getByDisplayValue(VALUE)).toBeInTheDocument();
  });

  it('displays helper text on error', () => {
    const helperText = 'This field is required!';

    render(
      <NumberInput
        name={NAME}
        value={VALUE}
        onChange={mockOnChange}
        onBlur={mockOnBlur}
        id={ID}
        label={LABEL}
        helperText={helperText}
        error
      />,
    );

    expect(screen.getByText(helperText)).toBeInTheDocument();
  });

  it('calls onChange callback', async () => {
    const NEW_VALUE = '4';

    const { getByRole } = render(
      <NumberInput
        name={NAME}
        value={VALUE}
        onChange={mockOnChange}
        onBlur={mockOnBlur}
        id={ID}
        label={LABEL}
      />,
    );

    const input = getByRole('spinbutton');
    await userEvent.type(input, NEW_VALUE);
    await waitFor(() => {
      expect(mockOnChange.mock.calls.length).toBe(1);
    });
  });

  it('calls onBlur callback', () => {
    const { getByRole } = render(
      <NumberInput
        name={NAME}
        value={VALUE}
        onChange={mockOnChange}
        onBlur={mockOnBlur}
        id={ID}
        label={LABEL}
      />,
    );

    const input = getByRole('spinbutton');
    fireEvent.blur(input);
    expect(mockOnBlur.mock.calls.length).toBe(1);
  });
});
