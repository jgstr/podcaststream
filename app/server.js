'use strict';

const express = require('express');

// Constants
const PORT = 9000;
const HOST = '0.0.0.0';

// App
const app = express();
app.get('/server-status', (req, res) => {
    res.send('<div id=go-status>Broadcasting</div>\n');
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);