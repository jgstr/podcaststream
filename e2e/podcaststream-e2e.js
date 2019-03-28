'use strict';
const path = require('path');
const compose = require('docker-compose');


describe("Podcaststream Broadcaster", function() {

    // Sets the suite test to timeout after 15 seconds
    this.timeout(25000);

    // Note: if these functions work like "normal" Javascript functions, the will get executed right away and not
    // wait for the docker containers to initialize. Must use either the setTimeout or Promise.
    before(function() {

        compose.upAll({ cwd: path.join(__dirname, '..'), log: true })
            .then(
                () => { console.log('Docker-compose ran.')},
                err => { console.log('Something went wrong:', err.message)}
            );
    });

    // TODO: This test runs too soon. Figure out how to delay running it. See note above before();
    it("should return a running status", function (browser, done) {

        browser
            .url('http://localhost:9000/server-status')
            .expect.element('#go-status').to.be.present;

        done();

    });

    // Now this seems to be running too soon.
    after(function () {
        compose.down().then(() => console.log('Docker-compose stopped and removed containers.'),
            err => {console.log('Something went wrong when trying to stop containers:', err.message)});
    })

});