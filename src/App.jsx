import React from 'react';

import useNavigation from './hooks/useNavigation';
import { Home, Server, Player } from './views';
import viewNames from './views/viewNames';

function App() {
  const { currentView } = useNavigation();

  switch (currentView) {
    case viewNames.HOME:
      return <Home />;
    case viewNames.SERVER:
      return <Server />;
    case viewNames.PLAYER:
      return <Player />;
    default:
      return <Home />;
  }
}

export default App;
