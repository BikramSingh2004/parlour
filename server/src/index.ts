
import express from "express";
import http from "http";
import cors from "cors";
import dotenv from "dotenv";
import eRoute from "./routes/emp";
import mongoose from "mongoose";
import { connectDB } from "./config/db";
import aRoute from "./routes/auth";
import { initIO } from "./sockets/ws";
import tRoute from "./routes/task";
import attRoute from "./routes/attendance";




dotenv.config();
const app = express();
const srv = http.createServer(app);


app.use(
  cors({
    origin: ["https://parlour-mu.vercel.app"],
    // origin: ["http://localhost:3000"], // frontend URL
    // frontend URL
    credentials: true, // allow cookies, auth headers
  })
);

app.use(express.json());
app.use("/api/auth", aRoute);
app.use("/api/employees", eRoute);
app.use("/api/tasks", tRoute);
app.use("/api/att", attRoute);


connectDB().then(() => {
  initIO(srv);
  srv.listen(process.env.PORT || 5000);
});



