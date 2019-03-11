describe("Podcaststream Broadcaster", function() {

    it("should return a running status", function(browser){
        browser
            .url('http://localhost:9000/server-status')
            .expect.element('#go-status').to.be.present;
    });

});