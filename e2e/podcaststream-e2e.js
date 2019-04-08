'use strict';
const path = require('path');
const compose = require('docker-compose');


describe("Podcaststream Broadcaster", function() {

    // Sets the suite test to timeout after 'n' milliseconds.
    this.timeout(30000);

    before("Run docker-compose up", function() {

        compose.upAll({ cwd: path.join(__dirname, '..'), log: true })
            .then(
                () => { console.log('Docker-compose ran.') },
                err => { console.log('Something went wrong:', err.message)}
            );
    });

    // TODO: This test runs too soon. Figure out how to delay running it. See note above before();
    it("should return a running status", function (browser) {

        // The .waitForElementPresent() method is the polling feature from Nightwatch.
        browser
            .pause(6000)
            .url('http://localhost:9000/server-status')
            .waitForElementPresent('#go-status', 12000, 5000)
            .expect.element('#go-status').to.be.present
            .end();



    });

    after("Run docker-composer down", function () {
        compose.down().then(() => console.log('Docker-compose stopped and removed containers.'),
            err => {console.log('Something went wrong when trying to stop containers:', err.message)});
    })

});