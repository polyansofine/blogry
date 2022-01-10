const config = {
  port: process.env.PORT || 5000,
  jwtSecret: process.env.JWT_SECRET || "mkT23j#u!45",
  mongoURI: process.env.MONGODB_URI || "mongodb://localhost/mern-blogry",
  autoIndex: false, // Don't build indexes
  reconnectTries: 30, // Retry up to 30 times
  reconnectInterval: 500, // Reconnect every 500ms
  poolSize: 10, // Maintain up to 10 socket connections
  // If not connected, return errors immediately rather than waiting for reconnect
  bufferMaxEntries: 0,
};

export default config;
