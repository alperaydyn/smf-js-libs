SMFAjax.get(MyApp.BASE_URL + 'get', {command: 'GET'}, function(data) {
	alert(data);
	chai.assert.equal(data, 'Server received GET request with {"command":"GET"}');
});