import { renderHook, act } from '@testing-library/react-hooks';

import { NavigationProvider } from '../context/NavigationContext';
import viewNames from '../views/viewNames';
import useNavigation from './useNavigation';

function renderNavigationHook() {
  const { result } = renderHook(() => useNavigation(), {
    wrapper: NavigationProvider,
  });

  return result;
}

describe('useNavigation hook', () => {
  it('has correct initial view', () => {
    const result = renderNavigationHook();
    expect(result.current.currentView).toBe(viewNames.HOME);
  });

  it('has correct state after navigate function called', () => {
    const result = renderNavigationHook();

    act(() => {
      result.current.navigate({ view: viewNames.SERVER });
    });

    expect(result.current.currentView).toBe(viewNames.SERVER);
  });
});
