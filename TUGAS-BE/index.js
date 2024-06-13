const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const notesRoute = require("./route/notesRoute");
const { testConnection } = require("./database/Db");
const dotenv = require("dotenv");
dotenv.config();

// Middleware
app.use(bodyParser.json());

// Routes
app.use("/api", notesRoute);

// Start server
const port = process.env.APP_PORT || 3000;
app.listen(port, async () => {
  await testConnection();
  console.log(`Server running at http://localhost:${port}`);
});
