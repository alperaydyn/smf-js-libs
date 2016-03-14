//Taken mostly from https://github.com/bevacqua/ruta3
var Router;
(function() {
	function pathToRegExp (path, keys) {
	  path = path
	    .concat('/?')
	    .replace(/\/\(/g, '(?:/')
	    .replace(/(\/)?(\.)?:(\w+)(?:(\(.*?\)))?(\?)?|\*/g, tweak)
	    .replace(/([\/.])/g, '\\$1')
	    .replace(/\*/g, '(.*)');

	  return new RegExp('^' + path + '$', 'i');

	  function tweak (match, slash, format, key, capture, optional) {
	    if (match === '*') {
	      keys.push(void 0);
	      return match;
	    }

	    keys.push(key);

	    slash = slash || '';

	    return ''
	      + (optional ? '' : slash)
	      + '(?:'
	      + (optional ? slash : '')
	      + (format || '')
	      + (capture ? capture.replace(/\*/g, '{0,}').replace(/\./g, '[\\s\\S]') : '([^/]+?)')
	      + ')'
	      + (optional || '');
	  }
	}

	function match (routes, uri) {
	  var captures;
	  var i = 0;

	  for (var len = routes.length; i < len; ++i) {
	    var route = routes[i];
	    var re = route.re;
	    var keys = route.keys;
	    var splats = [];
	    var params = {};

	    if (captures = uri.match(re)) {
	      for (var j = 1, len = captures.length; j < len; ++j) {
	        var value = typeof captures[j] === 'string' ? unescape(captures[j]) : captures[j];
	        var key = keys[j - 1];
	        if (key) {
	          params[key] = value;
	        } else {
	          splats.push(value);
	        }
	      }

	      return {
	        params: params,
	        splats: splats,
	        route: route
	      };
	    }
	  }

	  return null;
	}

	function routeInfo (path, index) {
	  var src;
	  var re;
	  var keys = [];

	  if (path instanceof RegExp) {
	    re = path;
	    src = path.toString();
	  } else {
	    re = pathToRegExp(path, keys);
	    src = path;
	  }

	  return {
	     re: re,
	     src: path.toString(),
	     keys: keys,
	     index: index
	  };
	}

	Router = function () {
	  if (!(this instanceof Router)) {
	    return new Router();
	  }

	  this.routes = [];
	}

	Router.prototype.define = function (path, action) {
	  if (!path) {
	    throw new Error(' route requires a path');
	  }
	  if (!action) {
	    throw new Error(' route ' + path.toString() + ' requires an action');
	  }

	  var route = routeInfo(path, this.routes.length);
	  route.action = action;
	  this.routes.push(route);
	}

	Router.prototype.navigateTo = function (uri) {
	  var routeData = match(this.routes, uri);
	  if (routeData) {
	  	routeData.route.action(routeData);
	  }
	}
})();