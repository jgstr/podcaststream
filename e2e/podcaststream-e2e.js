'use strict';
const path = require('path');
const compose = require('docker-compose');


describe("Podcaststream Broadcaster", function() {


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

    const fetchPage = (browser, retryCount = 10) => {

        return new Promise((resolve, reject) => {

            if(retryCount === 0) {
                reject(new Error("Couldn't fetch page."));
            }

            browser
                .url('http://localhost:9000/server-status')
                .waitForElementPresent('#go-status', 1000, 100, false)
                .isVisible('#go-status', (visible) => {
                    if(visible) {
                        console.log("**** Hit 'if' from fetchPage");
                        resolve();
                    } else {
                        console.log("*** Hit 'else' from fetchPage");
                        resolve(fetchPage(browser, retryCount - 1));
                    }
                });

            // Possible work around? .waitForElementPresent fails the test if not present
            // see here: https://github.com/nightwatchjs/nightwatch/issues/1098
            // browser
            //     .url('http://localhost:9000/server-status')
            //     .waitForElementPresent('#go-status', 1000, 100, false)
            //     .element('#go-status', 'select', function(result){
            //     if (result.value && result.value.ELEMENT) {
            //         // Element is present, do the appropriate tests
            //     } else {
            //         // Element is not present.
            //     }
            // });

        });
    };

    it("should return a running status", function (browser) {

        console.log("Got to 'it'");

        return fetchPage(browser).then(() => {

            browser.expect.element('#go-status').text.to.equal("");

        });


    });

    after(function(browser, done) {

        compose
            .down(["--rmi all"])
            .then(
                () => {
                    console.log('Docker-compose down ran.');
                    done();
                },
            err => {
                    console.log('Something went wrong when trying to stop containers:', err.message);
                    done();
                });
    });

});