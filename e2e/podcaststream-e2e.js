'use strict';
const path = require('path');
const compose = require('docker-compose');


describe("Podcaststream Broadcaster", function() {

    // before(function() {
    //
    //     compose.upAll({ cwd: path.join(__dirname, '..'), log: true })
    //         .then(
    //             () => { console.log('Docker-compose ran.')},
    //             err => { console.log('Something went wrong:', err.message)}
    //         );


    // });

    console.log("   >> Pretend e2e.js launched docker-compose.")

    it("should return a running status", function(browser){

        browser
            .url('http://localhost:9000/server-status')
            .expect.element('#go-status').to.be.present;

    });

});