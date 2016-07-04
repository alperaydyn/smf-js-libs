/* globals SMFAjax, MyApp*/
SMFAjax.postViaJSON(MyApp.BASE_URL, {
	command: "postViaJSON"
}, function(data) {
	alert(data);
});