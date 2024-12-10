import Server from "./model/Server";

const PORT = Number(process.env.PORT) || 3000;

const server = new Server(PORT);
server.run();