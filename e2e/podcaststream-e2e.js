'use strict';
const path = require('path');
const compose = require('docker-compose');


describe("Podcaststream Broadcaster", function() {

    // Sets the suite test to timeout after 'n' milliseconds.
    // this.timeout(30000);

    before(function(browser, done) {

        compose
                .upAll({ cwd: path.join(__dirname, '..'), log: true,})
                .then(
                    () => {
                        console.log('Docker-compose up ran.');
                        done();
                        },
                    err => {
                        console.log('Error running docker-compose:', err.message);
                        done();
                    }
                );
    });

    it("should return a running status", function (browser) {

        console.log("Got to 'it'");
        browser
            .pause(2000)
            .url('http://localhost:9000/server-status')
            .waitForElementPresent('#go-status', 12000, 5000)
            .expect.element('#go-status').to.be.present;



    });

    // after(function(browser, done) {
    //
    //     return compose
    //         .down(["--rmi all"])
    //         .then(
    //             () => {
    //                 console.log('Docker-compose down ran.');
    //                 done();
    //             },
    //         err => {
    //                 console.log('Something went wrong when trying to stop containers:', err.message);
    //                 done();
    //             });
    // })

});