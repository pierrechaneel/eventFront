// Socket context definition

import * as React from "react";
import { subsSocket } from "../services/sockets";

const SocketCtx = React.createContext({});

const SocketContext = ({ children }) => {
  const [commingNotifications, setCommingNotifications] = React.useState(0);

  return (
    <SocketCtx.Provider
      value={{ subsSocket, commingNotifications, setCommingNotifications }}
    >
      {children}
    </SocketCtx.Provider>
  );
};

export { SocketCtx };
export default SocketContext;
