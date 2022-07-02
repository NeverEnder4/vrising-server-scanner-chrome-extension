import React, { useEffect } from 'react';

import useNavigation from './hooks/useNavigation';
import useServers from './hooks/useServers';
import { Home, Server, Player } from './views';
import viewNames from './views/viewNames';
import './App.css';

function App() {
  const { currentView } = useNavigation();
  const { refresh } = useServers();

  useEffect(() => {
    refresh();
  }, []);

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
