import { useContext } from 'react';

import { NavigationContext } from '../context/NavigationContext';

function useNavigation() {
  const { view: currentView, setView } = useContext(NavigationContext);

  function navigate({ view }) {
    setView(view);
  }

  return { currentView, navigate };
}

export default useNavigation;
