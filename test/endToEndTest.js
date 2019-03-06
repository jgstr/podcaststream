import {expect} from "chai";
// import methods from files to test

describe("End-to-end", function(){

    it("should return response OK from web server", function(){

        // Starts web server (Express? Via app.js?)
        const express = require('express');
        const app = express();

        app.get('/', (req, res) => {
            res.send('Broadcast Test');
        });

        app.listen(3000, () => console.log('Server is listening on port 3000'));

        // Starts database (docker?)

        // Starts broadcast mock (docker?)

        // Starts browser (Nightwatch) -- So far I'm running the Node server and then running the nightwatch command
            // in a separate terminal. So somehow, nightwatch needs to run _automatically_ from this test.

        // Sends request through browser

        // Receives and stores response in "response"

        let response = "200";

        expect(response).to.equal("200");
    });



});
