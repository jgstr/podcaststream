const express = require('express');
const app = express();
const port = 9000;

app.get('/server-status', (req, res) => res.send('<div id=go-status>Broadcasting</div>'));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));