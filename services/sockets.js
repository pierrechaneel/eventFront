// Websockets access definition

// import io from "socket.io-client";
import generals from "../configs/generals.json";

import { io } from "socket.io-client";

const subsSocket = io(generals?.backendUrl, { autoConnect: false });

export { subsSocket };
