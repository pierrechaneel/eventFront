// Socket context definition

import * as React from "react";
import { subsSocket } from "../services/sockets";

const SocketCtx = React.createContext({});

const SocketContext = ({ children }) => {
  const [notifications, setNotifications] = React.useState([]);

  return (
    <SocketCtx.Provider value={{ subsSocket, notifications, setNotifications }}>
      {children}
    </SocketCtx.Provider>
  );
};

export { SocketCtx };
export default SocketContext;
