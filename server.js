// const http =require('http'); // node js import syntax, http import is the part of the node js therefore we dont need to install it
// const app =require('./backend/app')
// const port = process.env.PORT||3000
// //const server= http.createServer((req, res) => {

//  //   res.end('This is my first response')
// // createServer takes income http request
// //}); 
// app.set('port', port)
// const server= http.createServer(app);

// server.listen(port); // This is used to run the server process.env.PORT is the default port. In this case it will either use the default port or the port 3000
// // we need to restart the server every time when we make chages to the server, USE COMMAND node server.js where server.js is the name of the file.

const app = require("./backend/app");
const debug = require("debug")("node-angular");
const http = require("http");

const normalizePort = val => {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
};

const onError = error => {
  if (error.syscall !== "listen") {
    throw error;
  }
  const bind = typeof port === "string" ? "pipe " + port : "port " + port;
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
};

const onListening = () => {
  const addr = server.address();
  const bind = typeof port === "string" ? "pipe " + port : "port " + port;
  debug("Listening on " + bind);
};

const port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

const server = http.createServer(app);
server.on("error", onError);
server.on("listening", onListening);
server.listen(port);
//Install nodeMon if you dont want to run the server again