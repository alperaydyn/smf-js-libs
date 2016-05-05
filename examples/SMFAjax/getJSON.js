SMFAjax.getJSON(MyApp.BASE_URL + 'getJSON', function(data) {
	alert(JSON.stringify(data));
	chai.assert.deepEqual(data, { server: "getJSON" });
});