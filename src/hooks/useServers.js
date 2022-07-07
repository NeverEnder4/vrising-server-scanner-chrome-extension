import { useContext } from 'react';

import find from 'lodash/find';

import { ServersContext } from '../context/ServersContext';
import chromeStorage from '../utils/chromeStorage';
import serverScanner from '../utils/serverScanner';

function useServers() {
  const {
    servers, setServers, loading, setLoading, selectedServer, setSelectedServer,
  } = useContext(ServersContext);

  async function refresh() {
    setLoading(true);
    const savedServers = await chromeStorage.getAllServers();

    const serverConnectionStrings = savedServers.map(
      (server) => server.queryConnect,
    );

    const scannedServers = await serverScanner.get({
      serverList: serverConnectionStrings,
    });

    const updatedServers = savedServers.map((server) => {
      const scannedServerMatch = find(scannedServers, {
        connect: server.connect,
      });
      if (scannedServerMatch) {
        return {
          ...scannedServerMatch,
          nickname: server?.nickname,
          notes: server.notes,
          queryConnect: server.queryConnect,
        };
      }

      return server;
    });
    await chromeStorage.set({ keys: { servers: updatedServers } });
    setServers(updatedServers);
    setLoading(false);
  }

  async function loadFromStorage() {
    setLoading(true);
    const savedServers = await chromeStorage.getAllServers();

    setServers(savedServers);
    setLoading(false);
  }

  async function deleteServer({ connectionString }) {
    setLoading(true);
    const newServerList = await chromeStorage.removeServer({ connectionString });
    setServers(newServerList);
    setLoading(false);
  }

  async function editServer({ server, update }) {
    setLoading(true);
    const updated = await chromeStorage.updateServer({ server, update });
    setServers(updated);
    setLoading(false);
  }

  async function saveServers({ serverList }) {
    setServers(serverList);
    await chromeStorage.set({ keys: { servers: serverList } });
  }

  return {
    loading,
    servers,
    refresh,
    loadFromStorage,
    selectedServer,
    setSelectedServer,
    saveServers,
    deleteServer,
    editServer,
  };
}

export default useServers;
