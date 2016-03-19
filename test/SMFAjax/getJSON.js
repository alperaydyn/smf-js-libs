SMFAjax.getJSON(BASE_URL + 'getJSON', function(data) {
	chai.assert.deepEqual(data, { command: "getJSON", server: true });
});