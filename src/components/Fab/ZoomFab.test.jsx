import React from 'react';

import { render, screen, fireEvent } from '@testing-library/react';

import ZoomFab from './ZoomFab';

describe('ZoomFab component', () => {
  const mockOnClick = jest.fn();
  const mockRenderIcon = jest.fn(() => null);
  const COLOR = 'primary';
  const ARIA_LABEL = 'zoom-fab-component';

  it('renders the component', () => {
    render(
      <ZoomFab
        visible
        onClick={mockOnClick}
        color={COLOR}
        renderIcon={mockRenderIcon}
        ariaLabel={ARIA_LABEL}
      />,
    );

    expect(screen.getByLabelText(ARIA_LABEL)).toBeInTheDocument();
  });

  it('calls renderIcon callback once', () => {
    render(
      <ZoomFab
        visible
        onClick={mockOnClick}
        color={COLOR}
        renderIcon={mockRenderIcon}
        ariaLabel={ARIA_LABEL}
      />,
    );

    expect(mockRenderIcon.mock.calls.length).toBe(1);
  });

  it('calls onClick when clicked', () => {
    render(
      <ZoomFab
        visible
        onClick={mockOnClick}
        color={COLOR}
        renderIcon={mockRenderIcon}
        ariaLabel={ARIA_LABEL}
      />,
    );

    const zoomFab = screen.getByLabelText(ARIA_LABEL);
    fireEvent.click(zoomFab);
    expect(mockOnClick.mock.calls.length).toBe(1);
  });

  it('does not render when `visible` prop is false', () => {
    const { queryByLabelText } = render(
      <ZoomFab
        visible={false}
        onClick={mockOnClick}
        color={COLOR}
        renderIcon={mockRenderIcon}
        ariaLabel={ARIA_LABEL}
      />,
    );
    expect(queryByLabelText(ARIA_LABEL)).toBeNull();
  });
});
