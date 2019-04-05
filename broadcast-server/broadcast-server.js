'use strict';

const express = require('express');

// Constants
const PORT = 9001;
const HOST = '0.0.0.0';

// App
const app = express();
app.get('/broadcast-server-status', (req, res) => {

    // Now the database needs to deliver this message to "trigger"  #go-status
    res.send(JSON.stringify({
        status: "Up"
    }));

});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);