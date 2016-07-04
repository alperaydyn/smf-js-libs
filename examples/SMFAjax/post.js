/* globals SMFAjax, MyApp*/
//sending  {command: 'POST'} as application/x-www-form-urlencoded;
SMFAjax.post(MyApp.BASE_URL, {command: 'POST'}, function(data) {
	alert(data);
});