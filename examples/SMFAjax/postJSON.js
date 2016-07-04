/* globals SMFAjax, MyApp*/
SMFAjax.postJSON(MyApp.BASE_URL, {command: "postJSON"}, function(data) {
	alert(JSON.stringify(data));
});