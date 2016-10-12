# Smartface Helper JS Libraries

## What is it?

Smartface framework does not contain the DOM layer unlike browsers. For this reason, any JS library that depends on the DOM will not work. The goal of this repository is to create alternatives that make Smartface runtime work similar to popular libraries for the browser, including libraries that use the DOM.

## How to use?

As a convention, the libraries are added under the [`scripts/libs`](https://github.com/smartface/smf-js-libs/tree/master/libs/) folder.


### `include` function

When including files, the required syntax is to call the `include` function of the Smartface framework. This function requires that all files are given relative to the `scripts` folder.
In this repository, files that need to be placed under the `libs` folder are located under the `libs` folder.


If one were to look at `SMFAjax.js` file, it conditionally includes certain files with the assumptions stated above.

		if (typeof Object.assign !== 'function') {
			include('libs/Smartface/polyfills.js');
		}
		if (typeof formUrlEncoded !== 'function') {
			include('libs/Smartface/formUrlEncoded.js');
		}

When developing your own libraries, you can use this pattern for your conditional imports.

## How to add a new library?

Before adding or extending a library, first step requires checking which features Smartface runtime supports. Existing libraries may provide support for almost complete functionality of what is required. Most of the time, easiest libraries to use are those that are small, and do not try to do everything. Larger a framework gets, more likely that it will have dependencies that are browser related. In certain cases, a library might almost work out-of-the-box, but it might be required to handle some browser related code. In those cases, one can either implement a shim / polyfill to add or fake those features in Smartface, or simply remove some of its code that depend on those browser features.

## Using the examples

Examples for are placed under relative folder of `examples` folder. In order to run the examples place the files and use some of the libraries provided as instructed.

## SMFAjax
`include("libs/Smartface/SMFAjax.js");` is to use the library. This library internaly uses `polyfills` and `formUrlEncoded` libraries to be placed under same folder [`libs/Smartface/`](https://github.com/smartface/smf-js-libs/tree/master/libs/Smartface/).
You can either review code blocks, copy paste them or `include` them from the places where you are putting them. In order to use examples you can use the following web server with the code given below:
```javascript
var MyApp = {
	BASE_URL : "http://jslibs.azurewebsites.net/examples"
};
```


## XHRProfiler
While developing application in some cases it will be helpful to observe the network transfer informatin sent and recieved from XHR.
`include("libs/Smartface/XHRProfiler.js");` is to use the library. After adding this line, it is possible to change profiling from code.
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

## require
This library mimics **nodeJS** require implementation on Smartface. This is just the require pattern library, does not provide any nodeJS internal features. In that case it will throw error for module not found.

### restrictions
- Does not support built-in internal node modules (such as _fs_, _http_)
- Works only with files within the **scripts** folder. Does not fetch files on the web like _load_ and _include_ does
- In order to require a js file, add **.js** extension to end of it (_will be solved in future_)
- Requires an entry point, other than the project flow. Files included or loaded by other flow which does not link with entry point are not in require scope
- initRequire only once
- In order to work with **npm**, **node_modules** folder should be under **scripts** folder

### usage
You need to have a seperate js file which will be your entry point. In the example it is given as **mainfile.js**
```javascript
include("libs/require.js");
initRequire("mainfile.js");
```
Within _mainfile_, it is possible to use require. Also the files required within will get **require**, **module** and **exports** variables. Other files loaded with **load** or **include** will not have access to those variables. When opting in into a _require_ scope, in order to remain in _require_ scope, other files should be loaded only with **require**.

To create **node_modules** folder:
```sh
mkdir -p ~/workspace/scripts/node_modules
cd ~/workspace/scripts
```
make sure that current directory is `~/workspace/scripts` while using **npm**

## Fileviewer
Fileviewer.js is a simple file viewer. It dynamically creates a new viewer page and shows the file according to extension. To see it in a action, just pass your file path to fileViewer.openDocument() .
```javascript
var fileViewer = new SMF.Utils.Fileviewer();
fileViewer.openDocument(filePath);
```

## Oracle
Oracle libray readme file is located under [`libs/Oracle/README.md`](https://github.com/smartface/smf-js-libs/tree/master/libs/Oracle)

## Akbank
Akbank libray readme file is located under [`libs/Akbank/README.md`](https://github.com/smartface/smf-js-libs/tree/master/libs/Akbank)

## The future

- Repeatbox helper library
- View library
- `fetch` polyfill
- Could use code transpilation tools like `Babel` to use `require` like in
`Node.js`. Transpilation could convert `require` call into `include` in the
background.
- XHRProfiler with console.log
