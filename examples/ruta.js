var router = new Router();

router.define('/form', function(routeData) {
	alert(JSON.stringify(routeData));
});

router.define('/user/:id', function(routeData) {
	alert(JSON.stringify(routeData));
});

//router.navigateTo('/form');
router.navigateTo('/user/12');