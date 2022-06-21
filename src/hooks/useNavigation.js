import { useContext } from 'react';

import { NavigationContext } from '../context/NavigationContext';

function useNavigation() {
  const {
    view: currentView, setView, viewState, setViewState,
  } = useContext(NavigationContext);

  function navigate({ view, state }) {
    setView(view);
    if (state) setViewState(state);
  }

  return { currentView, viewState, navigate };
}

export default useNavigation;
