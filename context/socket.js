// Socket context definition

import * as React from "react";
import { subsSocket } from "../services/sockets";

const SocketCtx = React.createContext({});

const SocketContext = ({ children }) => {
  const [isConnected, setIsConnected] = React.useState(false);

  return (
    <SocketCtx.Provider value={{ subsSocket, isConnected, setIsConnected }}>
      {children}
    </SocketCtx.Provider>
  );
};

export { SocketCtx };
export default SocketContext;
