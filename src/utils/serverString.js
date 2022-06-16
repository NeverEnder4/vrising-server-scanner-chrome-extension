function parse({ server }) {
  const [hostIp, queryPort] = server.split(':');
  return { hostIp, queryPort };
}

function stringify({ hostIp, queryPort }) {
  const serverString = `${hostIp}:${queryPort}`;
  return serverString;
}

export default { parse, stringify };
