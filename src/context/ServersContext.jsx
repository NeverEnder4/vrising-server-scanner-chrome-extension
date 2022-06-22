import React, {
  useState, useMemo,
} from 'react';

import PropTypes from 'prop-types';

export const ServersContext = React.createContext();

export function ServersProvider({ children }) {
  const [servers, setServers] = useState(null);
  const [loading, setLoading] = useState(false);

  // useMemo implemented to avoid inlining an object as Provider value which causes
  // unchecked re-renders of Provider
  const value = useMemo(() => ({
    servers, setServers, loading, setLoading,
  }), [JSON.stringify(servers), setServers, loading, setLoading]);

  return (
    <ServersContext.Provider value={value}>
      {children}
    </ServersContext.Provider>
  );
}

ServersProvider.propTypes = {
  children: PropTypes.element.isRequired,
};
