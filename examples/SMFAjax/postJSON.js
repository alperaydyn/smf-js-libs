SMFAjax.postJSON(MyApp.BASE_URL + 'postJSON', {command: "postJSON"}, function(data) {
	alert(JSON.stringify(data));
	chai.assert.deepEqual(data, { command: "postJSON", server: "postJSON" });
});