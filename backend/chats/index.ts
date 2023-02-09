import http from "http";
import app from "./app";
import { Server } from "socket.io";
import { socketController } from "./controllers/socketController";
import * as logger from "./utils/logger";
import * as config from "./utils/config";

const server = http.createServer(app);

const io = new Server(server, {
	path: "/socket",
	cors: {
		credentials: true,
		origin: "http://localhost:3000",
		methods: ["GET", "POST"],
	},
});

io.on("connection", (socket) => socketController(socket, io));

server.listen(config.PORT, (): void => {
	logger.info(`Server running on port ${config.PORT}`);
});
