SMFAjax.getViaJSON(BASE_URL + 'getViaJSON', {command: "getViaJSON"}, function(data) {
	chai.assert.deepEqual(data, { command: "getViaJSON", server: true });
});