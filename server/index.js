const express = require("express");
const path = require("path");
const compress = require('compression');
const project = require('./config');
const api = require('./api');

const app = express();

app.use(compress()); // Apply gzip compression
app.use("/api", api());

app.listen(project.server_port, () => {
    console.log(`Server is now running at http://localhost:${project.server_port}.`);
});