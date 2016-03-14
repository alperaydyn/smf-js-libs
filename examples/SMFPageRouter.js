var smfRouter = new SMFPageRouter();

smfRouter.define('/user/:id', function(page, routeData) {
	var btn = new SMF.UI.TextButton({
		top : '35%',
		text : 'User id is ' + routeData.params.id,
		onPressed : function () {
			alert('Button is pressed');
		}
	});
	page.add(btn);
	page.show();
});

smfRouter.navigateTo('/user/12');