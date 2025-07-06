import { Server } from "socket.io";

let io: Server;

export const initIO = (s: any) => {
  io = new Server(s, {
    cors: {
      origin: "*",
    },
  });

  io.on("connection", (sk) => {
    sk.on("punch", (x) => {
      io.emit("punch-log", x);
    });
  });
};

export const getIO = () => io;
