SMFAjax.getJSONViaJSON(BASE_URL + 'getJSONViaJSON', {command: "getJSONViaJSON"}, function(data) {
	chai.assert.deepEqual(data, { command: "getJSONViaJSON", server: true });
});