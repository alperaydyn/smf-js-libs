function SMFPageRouter() {
	this.router = new Router();
}

SMFPageRouter.prototype.define = function(route, callback) {
	this.router.define(route, function(params){
		var page = new SMF.UI.Page();
		callback(page, params);
	});
};

SMFPageRouter.prototype.navigateTo = function(route) {
	this.router.navigateTo(route);
};