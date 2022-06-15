import React from 'react';

import { render, screen } from '@testing-library/react';

import { NavigationProvider } from '../../context/NavigationContext';
import Home from './Home';

describe('Home view', () => {
  it('renders a floating action button', () => {
    render(
      <NavigationProvider>
        <Home />
      </NavigationProvider>,
    );
    expect(screen.getByLabelText('Add Server')).toBeInTheDocument();
  });
});
