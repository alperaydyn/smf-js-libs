SMFAjax.postJSONViaJSON(MyApp.BASE_URL + 'postJSONViaJSON', {command: "postJSONViaJSON"}, function(data) {
	alert(JSON.stringify(data));
	chai.assert.deepEqual(data, { command: "postJSONViaJSON", server: "postJSONViaJSON" });
});