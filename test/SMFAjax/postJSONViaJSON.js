SMFAjax.postJSONViaJSON(BASE_URL + 'postJSONViaJSON', {command: "postJSONViaJSON"}, function(data) {
	chai.assert.deepEqual(data, { command: "postJSONViaJSON", server: true });
});