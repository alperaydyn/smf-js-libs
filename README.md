# Smartface Helper JS Libraries

## What is it?

Smartface framework does not contain the DOM layer unlike browsers.

For this reason, any JS library that depends on the DOM will not work.

The goal of this repository is to create alternatives that make Smartface runtime work similar to popular libraries for the browser, including libraries that use the DOM.

## How to use?

As a convention, the libraries are added under the `scripts/vendor` folder.

For example, if one wanted to include the `chai` testing framework, the best place would be to place it in `scripts/vendor/chai/chai.js`.

If one wanted to add plugins for `chai`, one could place them under the `scripts/vendor/chai` folder.

### `include` function

When including files, the required syntax is to call the `include` function of the Smartface framework.

This function requires that all files are given relative to the `scripts` folder.

In this repository, files that need to be placed under the `vendor` folder are located under the `lib` folder.

For example, to use the `SMFPageRouter.js` file, place it under the `vendor/Smartface` folder.

Then include it from your scripts with `include("vendor/Smartface/SMFPageRouter.js")` and then use it as shown in the `examples/SMFPageRouter.js`.

If one were to look at `lib/SMFAjax.js` file, it conditionally includes certain files with the assumptions stated above.

		if (typeof Object.assign !== 'function') {
			include('vendor/Smartface/polyfills.js');
		}
		if (typeof formUrlEncoded !== 'function') {
			include('vendor/Smartface/formUrlEncoded.js');
		}

When developing your own libraries, you can use this pattern for your conditional imports.

## How to add a new library?

Before adding or extending a library, first step requires checking which features Smartface runtime supports.

Existing libraries may provide support for almost complete functionality of what is required.

Most of the time, easiest libraries to use are those that are small, and do not try to do everything.

Larger a framework gets, more likely that it will have dependencies that are browser related.

In certain cases, a library might almost work out-of-the-box, but it might be required to handle some browser related code.

In those cases, one can either implement a shim / polyfill to add or fake those features in Smartface, or simply remove some of its code that depend on those browser features.

For example, in the case of `SMFPageRouter`, an existing router library called `ruta` provided enough functionality to use as a base.

`SMFPageRouter` basically includes `ruta` and extends it with code to make it work with Smartface runtime.

Not: Burayı tam hatırlamıyorum ama galiba ruta.js'ten ben otomatik url handling yaptığı kısımları çıkardım.

## The future

- Repeatbox helper library

- convert `SMFAjax` to use `XHR`

- View library

- `fetch` polyfill

- Could use code transpilation tools like `Babel` to use `require` like in `Node.js`. Transpilation could convert `require` call into `include` in the background.

