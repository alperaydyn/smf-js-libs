/* globals SMFAjax, MyApp*/
SMFAjax.postJSONViaJSON(MyApp.BASE_URL, {command: "postJSONViaJSON"}, function(data) {
	alert(JSON.stringify(data));
});