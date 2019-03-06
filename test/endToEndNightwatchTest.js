module.exports = {
    'End-to-end Broadcast Browser Test' : function (client) {
        client
            .url('http://localhost:3000')
            .waitForElementVisible('html', 1000)
            .assert.containsText('html',
            'Broadcast Test')
            .end();
    }
};

