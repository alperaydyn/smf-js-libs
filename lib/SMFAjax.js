if (typeof Object.assign !== 'function') {
	include('polyfills.js');
}
if (typeof formUrlEncoded !== 'function') {
	include('formUrlEncoded.js');
}

var SMFAjax = {};

SMFAjax.defaultSetup = Object.freeze({
	accepts: '', //depends on DataType
	async: true,
	beforeSend: function() {
		return true;
	},
	cache: true, //false for dataType 'script' and 'jsonp', It works by appending "_={timestamp}" to the GET parameters
	//A function to be called when the request finishes (after success and error callbacks are executed).
	complete: function(jqXHR, textStatus) {
		//textStatus is one of "success", "notmodified", "nocontent", "error", "timeout", "abort", or "parsererror"
	},
	contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
	crossDomain: true,
	data: {},
	dataFilter: function(data, dataType) {
		return data;
	},
	dataType: 'json',//xml, script, html
	//"jsonp": Loads in a JSON block using JSONP. Adds an extra "?callback=?" to the end of your URL to specify the callback. Disables caching by appending a query string parameter, "_=[TIMESTAMP]", to the URL unless the cache option is set to true.
	error: function(jqXHR, textStatus, errorThrown) {
		//textStatus: null, "timeout", "error", "abort", and "parsererror"

	},
	global: false, //disabled here
	headers: {
		'X-Requested-With': 'XMLHttpRequest'
	},
	ifModified: false,
	isLocal: false,
	jsonp: '',
	jsonpCallback: function() {},
	method: 'GET',
	mimeType: '',
	password: '',
	processData: true, //By default, data passed in to the data option as an object (technically, anything other than a string) will be processed and transformed into a query string, fitting to the default content-type "application/x-www-form-urlencoded". If you want to send a DOMDocument, or other non-processed data, set this option to false.
	scriptCharset: '',
	statusCode: {},
	success: function(data, textStatus, jqXHR) {

	},
	timeout: -1,
	traditional: false, //use the traditional style of param serialization.
	url: '',
	username: '',
	xhr: function() {
		return XMLHttpRequest;
	},
	xhrFields: {} //?
});

SMFAjax.setup = {};

SMFAjax.createHeaders = function(settings) {
	var keys = Object.keys(settings.headers);
	var headers = keys.map(function(key){
		return key + ': ' + settings.headers[key];
	}).join('\r\n');
	var matched = headers.match(/content-type/i);
	if (!matched) {
		headers += 'Content-Type: ' + settings.contentType;
	}
	return headers;
};

SMFAjax.ajax = function(url, settings) {
	if (typeof url !== 'string') {
		settings = url;
	}
	settings = Object.assign({}, SMFAjax.defaultSetup, SMFAjax.setup, settings);

	var contentType = settings.contentType;
	var requestBody = settings.data;
	if (contentType.indexOf('json') > -1) {
		requestBody = JSON.parse(requestBody);
	} else if (contentType.indexOf('form-urlencoded') > -1) {
		requestBody = formUrlEncoded(requestBody);
	}

	var headers = SMFAjax.createHeaders(settings);
	
	var client = new SMF.Net.WebClient({
		URL: settings.url,
		requestHeaders: headers,
		requestBody: requestBody,
		httpMethod: settings.method.toUpperCase(),
		onServerError: settings.error,
		onSizeOverflow: settings.error,
		onSyndicationSuccess: function(e) {
			var data = this.responseText;
			if (settings.processData) {
				if (settings.dataType === 'json') {
					try {
						data = JSON.parse(data);
					} catch (e) {
						return this.onServerError();
					}
				} else if (settings.dataType === 'xml') {
					try{
						data = (new DOMParser()).parseFromString(data);
					} catch(e) {
						return this.onServerError();
					}
				} else {}
			}
			settings.success.call(this, data);
		},
		ignoreSSLErrors: true
	});
	// client.responseHeaders = [];
	client.run();
};

SMFAjax.get = function(url, data, success, dataType) {
	var obj = SMFAjax.processShorthandArguments(url, data, success, dataType);
	obj.method = 'GET';
	SMFAjax.ajax(obj);
};

SMFAjax.getJSON = function(url, data, success) {
	SMFAjax.get(url, data, success, 'json');
};

SMFAjax.handleArguments = function(url, settings) {
	if (typeof url !== 'string') {
		settings = url;
	}
	settings = Object.assign({}, SMFAjax.defaultSetup, SMFAjax.setup, settings);
	if (typeof url === 'string') {

	}
};

SMFAjax.post = function(url, settings, callback) {
	var obj = SMFAjax.processShorthandArguments(url, data, success, dataType);
	obj.method = 'POST';
	SMFAjax.ajax(obj);
};

SMFAjax.processShorthandArguments = function(url, data, success, dataType) {
	var obj = {};
	if (typeof url === 'object') {
		return url;
	}
	if (typeof url !== 'string') {
		return null;
	}
	obj.url = url;
	if (typeof data === 'function') {
		dataType = success;
		success = data;
		data = null;
	}
	if (data) {
		obj.data = data;
	}
	if (success) {
		obj.success = success;
	}
	if (dataType) {
		obj.dataType = dataType;
	}
	return obj;
};
