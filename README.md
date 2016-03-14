# Smartface Helper Javascript Libraries

This repo contains libraries that facilitate developing Smartface applications.

As the Smartface environment lacks DOM, when implementing a library, DOM dependency is removed from existing code and converted to work with Smartface.

Currently implemented libraries:

- Router (taken from [ruta.js](https://github.com/bevacqua/ruta3))
- SMFPageRouter (extends the Router and passes in a blank SMF.UI.Page element to the callback)

Check the examples for basic usage.

More libraries and examples will be added.