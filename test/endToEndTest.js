// import methods from files to test
import {expect} from "chai";

describe("End-to-end", function(){

    it("should return response status code 200 from web server", function(){

        // Starts web server (Express? Via app.js?)
        const express = require('express');
        const app = express();

        let responseStatusCode;

        app.get('/', (req, res) => {
            res.send('Broadcast Test');
            responseStatusCode = res.statusCode;
            console.log(res.statusCode);
        });

        app.listen(3000, () => console.log('Server is listening on port 3000'));

        // Nightwatch should run before this to make the request and provide a value for
        // responseStatusCode.

        expect(responseStatusCode).to.equal(200);

        // Starts database (docker?)

        // Starts broadcast mock (docker?)

        // Starts browser (Nightwatch) -- So far I'm running the Node server and then running the nightwatch command
            // in a separate terminal. So somehow, nightwatch needs to run _automatically_ from this test.

        // Sends request through browser

        // Receives and stores response in "response"


    });

});
