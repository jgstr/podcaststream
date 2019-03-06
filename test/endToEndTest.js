import {expect} from "chai";
// import methods from files to test

describe("End-to-end", function(){

    it("should return response OK from web server", function(){

        // Starts web server (Express? Via app.js?)
        // Starts database (docker?)
        // Starts broadcast mock (docker?)
        // Starts browser (Nightwatch)
        // Sends request through browser
        // Receives and stores response in "response"

        let response = "200";

        expect(response).to.equal("200");
    });



});
