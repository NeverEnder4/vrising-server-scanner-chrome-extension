/* global chrome */
import find from 'lodash/find';

function handlePromise({ resolve, reject, data }) {
  const { lastError } = chrome.runtime;
  if (lastError) reject(lastError);
  else resolve(data);
}

async function get({ keys }) {
  const promise = new Promise((resolve, reject) => {
    chrome.storage.sync.get(keys, (data) => {
      handlePromise({ resolve, reject, data });
    });
  });

  const result = await promise;
  return result;
}

async function set({ keys }) {
  const promise = new Promise((resolve, reject) => {
    chrome.storage.sync.set(keys, (data) => {
      handlePromise({ resolve, reject, data });
    });
  });

  const result = await promise;
  return result;
}

async function remove({ keys }) {
  const promise = new Promise((resolve, reject) => {
    chrome.storage.sync.remove(keys, (data) => {
      handlePromise({ resolve, reject, data });
    });
  });

  const result = await promise;
  return result;
}

async function getAllServers() {
  const defaultValue = { servers: [] };
  const response = await get({ keys: defaultValue });
  return response.servers;
}

async function setServers({ servers }) {
  const result = await set({ keys: { servers } });
  return result;
}

async function getServer({ server }) {
  const defaultValue = { servers: [] };
  const response = await get({ keys: defaultValue });
  const targetServer = find(response.servers, { queryConnect: server });

  return targetServer || null;
}

async function removeServer({ connectionString }) {
  const servers = await getAllServers();

  const newServers = servers.filter((server) => server.connect !== connectionString);
  await set({ keys: { servers: newServers } });
  return newServers;
}

async function updateServer({ server, update }) {
  const servers = await getAllServers();
  const updated = servers.map((savedServer) => {
    if (server.connect === savedServer.connect) {
      return {
        ...savedServer,
        ...update,
      };
    }

    return savedServer;
  });

  await set({ keys: { servers: updated } });
  return updated;
}

export default {
  get, set, remove, getAllServers, getServer, removeServer, updateServer, setServers,
};
