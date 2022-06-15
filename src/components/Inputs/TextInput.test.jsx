import React from 'react';

import {
  render, screen, waitFor, fireEvent,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import TextInput from './TextInput';

describe('TextInput component', () => {
  const mockOnChange = jest.fn();
  const mockOnBlur = jest.fn();
  const ID = 'name-input';
  const LABEL = 'Name*';
  const VALUE = 'My Name';
  const NAME = 'name';
  const MAX_LENGTH = 140;

  it('renders the correct components', () => {
    render(
      <TextInput
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
      <TextInput
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
    const NEW_VALUE = 'D';

    const { getByRole } = render(
      <TextInput
        name={NAME}
        value={VALUE}
        onChange={mockOnChange}
        onBlur={mockOnBlur}
        id={ID}
        label={LABEL}
      />,
    );

    const input = getByRole('textbox');
    await userEvent.type(input, NEW_VALUE);
    await waitFor(() => {
      expect(mockOnChange.mock.calls.length).toBe(1);
    });
  });

  it('calls onBlur callback', () => {
    const { getByRole } = render(
      <TextInput
        name={NAME}
        value={VALUE}
        onChange={mockOnChange}
        onBlur={mockOnBlur}
        id={ID}
        label={LABEL}
      />,
    );

    const input = getByRole('textbox');
    fireEvent.blur(input);
    expect(mockOnBlur.mock.calls.length).toBe(1);
  });

  it('displays character count when `maxLength` prop is provided', () => {
    const COUNT = `${VALUE.length}/${MAX_LENGTH}`;
    render(
      <TextInput
        name={NAME}
        value={VALUE}
        onChange={mockOnChange}
        onBlur={mockOnBlur}
        id={ID}
        label={LABEL}
        maxLength={MAX_LENGTH}
      />,
    );

    expect(screen.getByText(COUNT)).toBeInTheDocument();
  });
});
