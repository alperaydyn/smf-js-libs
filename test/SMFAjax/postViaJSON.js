SMFAjax.postViaJSON(BASE_URL + 'postViaJSON', {command: "postViaJSON"}, function(data) {
	chai.assert.deepEqual(data, { command: "postViaJSON", server: true });
});