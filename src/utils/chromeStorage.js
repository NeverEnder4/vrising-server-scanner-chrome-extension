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

export default {
  get, set, remove, getAllServers, getServer, removeServer,
};
