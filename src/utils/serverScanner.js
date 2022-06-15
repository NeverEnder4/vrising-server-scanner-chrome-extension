import isEmpty from 'lodash/isEmpty';

import serverString from './serverString';

const KEY = process.env.REACT_APP_SERVER_SCANNER_KEY;
const HOST = process.env.REACT_APP_SERVER_SCANNER_HOST;

const options = {
  headers: {
    'X-RapidAPI-Key': KEY,
    'X-RapidAPI-Host': HOST,
  },
};

async function get({ serverList }) {
  if (!Array.isArray(serverList)) {
    throw new Error(
      `serverList arg must by type array, received type ${typeof serverList}`,
    );
  }

  if (!serverList.length) return [];

  const responses = await Promise.all(
    serverList.map(async (server) => {
      const { hostIp, queryPort } = serverString.parse({ server });
      const url = `https://${HOST}/${hostIp}/${queryPort}`;

      const data = await fetch(url, options);
      const response = await data.json();

      if (isEmpty(response)) return null;
      return response;
    }),
  );

  return responses;
}

export default { get };
