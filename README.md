# Smartface Helper JS Libraries

## What is it?

Smartface framework does not contain the DOM layer unlike browsers. For this reason, any JS library that depends on the DOM will not work. The goal of this repository is to create alternatives that make Smartface runtime work similar to popular libraries for the browser, including libraries that use the DOM.

## How to use?

As a convention, the libraries are added under the `scripts/vendor` folder.


### `include` function

When including files, the required syntax is to call the `include` function of the Smartface framework. This function requires that all files are given relative to the `scripts` folder. 
In this repository, files that need to be placed under the `vendor` folder are located under the `vendor` folder.


If one were to look at `SMFAjax.js` file, it conditionally includes certain files with the assumptions stated above. 

		if (typeof Object.assign !== 'function') {
			include('vendor/Smartface/polyfills.js');
		}
		if (typeof formUrlEncoded !== 'function') {
			include('vendor/Smartface/formUrlEncoded.js');
		}

When developing your own libraries, you can use this pattern for your conditional imports.

## How to add a new library?

Before adding or extending a library, first step requires checking which features Smartface runtime supports. Existing libraries may provide support for almost complete functionality of what is required. Most of the time, easiest libraries to use are those that are small, and do not try to do everything. Larger a framework gets, more likely that it will have dependencies that are browser related. In certain cases, a library might almost work out-of-the-box, but it might be required to handle some browser related code. In those cases, one can either implement a shim / polyfill to add or fake those features in Smartface, or simply remove some of its code that depend on those browser features.

## Using the examples

Examples for are placed under relative folder of `examples` folder. In order to run the examples place the files and use some of the libraries provided as instructed.

## SMFAjax
`include("vendor/Smartface/SMFAjax.js");` is to use the library. This library internaly uses `polyfills` and `formUrlEncoded` libraries to be placed under same folder `vendor/Smartface/`.
You can either review code blocks, copy paste them or `include` them from the places where you are putting them. In order to use examples you can use the following web server with the code given below: 
```javascript
var MyApp = {
	BASE_URL : "http://jslibs.azurewebsites.net/examples"	
};
```


## XHRProfiler
While developing application in some cases it will be helpful to observe the network transfer informatin sent and recieved from XHR.
`include("vendor/Smartface/XHRProfiler.js");` is to use the library. After adding this line, it is possible to change profiling from code.
```javascript
XMLHttpRequest.profiling.enabled = true;
```
from `XMLHttpRequest.profiling.` other properties shows what will be included within the displayed log:
- requestHeaders
- requestBody
- responseBody
- responseHeaders
- method
- url
- digestLog - Combines request & response in single message, after response is recieved

## permissions
Since Android 6.0 (Marshmallow) some intensive permissions are asked to user regardles they are being stated in manifest file. Smartface has implemented same usage of Native Android Permission management. However in terms of JavaScript using the same structure is not that effective. With using this library:
- `checkPermission` function checks & requests permissions if required with a callback. It is possible to state a rationale (reason) why those permissions are required
- `applyPermission` function is same as `Function.prototype.apply` with `checkPermission` functionality

## The future

- Repeatbox helper library
- View library
- `fetch` polyfill
- Could use code transpilation tools like `Babel` to use `require` like in 
`Node.js`. Transpilation could convert `require` call into `include` in the
background.
- XHRProfiler with console.log

