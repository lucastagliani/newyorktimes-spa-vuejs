const express = require('express');
const serveStatic = require('serve-static');
const path = require('path');

const app = express();
app.use(serveStatic(path.join(__dirname, 'dist')));

app.get(/.*/, (req, res) => {
  res.sendfile(`${__dirname}/dist/index.html`);
});

const port = process.env.PORT || 80;
app.listen(port);

console.log(`Running on port ${port}...`);
