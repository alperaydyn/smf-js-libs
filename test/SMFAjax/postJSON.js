SMFAjax.postJSON(BASE_URL + 'postJSON', function(data) {
	chai.assert.deepEqual(data, { command: "postJSON", server: true });
});