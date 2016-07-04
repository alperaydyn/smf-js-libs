/* globals SMFAjax, MyApp*/
SMFAjax.getJSON(MyApp.BASE_URL, {
	command: 'GET'
}, function(data) {
	alert({
		title: "getJSON",
		message: JSON.stringify(data, null, "\t")
	});
});