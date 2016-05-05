SMFAjax.postViaJSON(MyApp.BASE_URL + 'postViaJSON', {command: "postViaJSON"}, function(data) {
	alert(data);
	chai.assert.equal(data, 'Server received postViaJSON request with {"command":"postViaJSON"}');
});