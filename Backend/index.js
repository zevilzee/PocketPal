import express from "express";
import http from "http";
import cors from "cors";
import "./src/config/config.js";
import userRoutes from "./src/Routes/userRoutes.js";

const app = express();
app.use(express.json());
app.use(cors());
const server = http.createServer(app);
app.use(userRoutes);

server.listen(process.env.PORT || 3000, () => {
  console.log("Server is running");
});