// import methods from files to test
import {expect} from "chai";
import {serverTest} from "../test/serverTest";

describe("podcast stream", function(){

    it("should return response status code 200 from web server", function(){

        // Starts web server with Express on localhost:3000
        // Ideally, I should use chai-http feature to automatically start/stop the server
        let app = serverTest();


        // Starts database (docker?)

        // Starts broadcast mock (docker?)

        // Starts browser (Nightwatch) -- So far I'm running the Node server and then running the nightwatch command
            // in a separate terminal. So somehow, nightwatch needs to run _automatically_ from this test.

        // Sends request through browser

        // Receives and stores response in "response"
        expect(app.response.statusCode).to.equal(200);


    });

});
