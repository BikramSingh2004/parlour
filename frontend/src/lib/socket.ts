
import { io } from "socket.io-client";
import { API } from "./env";

export const sk = io(API);
