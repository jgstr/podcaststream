'use strict';
const path = require('path');
const compose = require('docker-compose');

describe("Podcaststream Broadcaster", function () {
    const streamerStatusSelector = '.streamer-status';
    this.timeout(20000);

    before(function (browser, done) {
        compose
            .upAll({cwd: path.join(__dirname, '..'), log: true,})
            .then(
                () => {
                    console.log('Docker-compose up ran.');
                    done();
                },
                err => {
                    console.log('Error running docker-compose up:', err.message);
                    done();
                }
            );
    });

    const fetchPage = (browser, retryCount = 20) => {
        return new Promise((resolve, reject) => {
            if (retryCount === 0) {
                reject(new Error("Couldn't fetch page."));
            }

            browser
                .url('http://localhost:5000/')
                .waitForElementPresent(streamerStatusSelector, 1000, 100, false)
                .isVisible(streamerStatusSelector, (visible) => {
                    if (visible.status !== -1) {
                        resolve();
                    } else {
                        resolve(fetchPage(browser, retryCount - 1));
                    }
                });
        });
    };

    it("should return a running status", function (browser) {
        return fetchPage(browser).then(() => {
            browser.expect.element(streamerStatusSelector).text.to.equal("Up").after(30000);
        });
    });

    after(function (browser, done) {
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