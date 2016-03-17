var BASE_URL = 'https://websocket-test-serkanserttop-smf.c9.io:8080/';
SMFAjax.getJSON(BASE_URL + 'test', function(data) {
	alert(JSON.stringify(data));
});