'use strict';
const {Docker} = require('node-docker-api');

const docker = new Docker({ socketPath: '/var/run/docker.sock' });

describe("Podcaststream Broadcaster", function() {

    // before(function() {
    //
    //     docker.container.create({
    //         Image: 'podnode2',
    //         name: 'e2e_test'
    //     })
    //         .then(container => container.start())
    //         .then(container => container.stop())
    //         .then(container => container.restart())
    //         .then(container => container.delete({ force: true }))
    //         .catch(error => console.log(error));
    //
    // });

    it("should return a running status", function(browser){

        browser
            .url('http://localhost:8000/server-status')
            .expect.element('#go-status').to.be.present;

    });

});