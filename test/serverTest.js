// Just a test server for endToEndTest.js

export function serverTest() {

    const express = require('express')
    const app = express()
    const port = 3000

    app.get('/', (req, res) => res.send('Broadcaster says hello with ' + res.statusCode));

    app.listen(port, () => console.log(`Express server listening on port ${port}!`))

    return app;

}
