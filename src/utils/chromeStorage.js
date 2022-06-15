/* global chrome */

function handlePromise({ resolve, reject, data }) {
  const { lastError } = chrome.runtime;
  if (lastError) reject(lastError);
  else resolve(data);
}

async function get({ keyList }) {
  const promise = new Promise((resolve, reject) => {
    chrome.storage.sync.get(keyList, (data) => {
      handlePromise({ resolve, reject, data });
    });
  });

  const result = await promise;
  return result;
}

async function set({ keyValueMap }) {
  const promise = new Promise((resolve, reject) => {
    chrome.storage.sync.set(keyValueMap, (data) => {
      handlePromise({ resolve, reject, data });
    });
  });

  const result = await promise;
  return result;
}

async function remove({ keyList }) {
  const promise = new Promise((resolve, reject) => {
    chrome.storage.sync.remove(keyList, (data) => {
      handlePromise({ resolve, reject, data });
    });
  });

  const result = await promise;
  return result;
}

async function getServers({ serverList }) {
  console.log(chrome, 'CHROME');
  const defaultValue = { servers: [] };
  const response = await get({ keyList: [defaultValue] });
  console.log(response, serverList, 'get servers');
}

export default {
  get, set, remove, getServers,
};
