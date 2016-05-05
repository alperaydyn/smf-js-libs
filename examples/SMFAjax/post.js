SMFAjax.post(MyApp.BASE_URL + 'post', {command: 'POST'}, function(data) {
	alert(data);
	chai.assert.equal(data, 'Server received POST request with {"command":"POST"}');
});