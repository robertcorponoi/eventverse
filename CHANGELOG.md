2.0.0 / 2020-01-22
==================
* [FEATURE] Removed `context` parameter from `on` and `once` as context and be preserved by using an arrow function instead.
* [FEATURE] Added `uses` parameter to `on` to indicate the amount of uses a listener has before being destroyed automatically.
* [DOCS] Added test and updated documentaiton for `uses`.
* [MISC] Made `addListener` private as it should have been initially.
* [MISC] Updated folder structure.

1.0.7 / 2020-01-22
==================
* [DOCS] Moved logo to graphics repository and updated link in README.
* [MISC] Updated dev dependencies to their latest versions.
* [MISC] Updated license year to reflect new year.

1.0.6 / 2019-11-20
==================
* [MISC] Updated dependencies to their latest versions.
* [MISC] Removed unnecessary jsdoc comments.
* [MISC] Replaced wildcard import with specific import.
* [MISC] Updated private properties and methods.
* [MISC] Added badges to README.

1.0.5 / 2019-11-03
==================
* [MISC] Misc cleanup.

1.0.4 / 2019-11-03
==================
* [FEATURE] Updated dependencies to their latest versions.

1.0.3 / 2019-07-29
==================
* [FEATURE] Added the times called method to keep track of the number of times a listener has been called and added test cases for it.

1.0.2 / 2019-07-29
==================
* [FEATURE] Updated all dev dependencies to their latest versions.

1.0.1 / 2019-07-17
==================
* [HOTFIX] Updated all dev dependencies to their latest versions and fixed any security vulnerabilities found in them.

1.0.0 / 2019-06-30
==================
* Added CHANGELOG
* Updated out of date dev dependencies
* Moved module out of dist folder into root folder
* Removed pseudo-privacy from class properties
* Changed Listner to be an interface

0.1.0
==================
* Initial Release