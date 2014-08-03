WhoAre
======

WhoAre is a nodejs whois module. 

## Installation

	npm install whoare --save

## Usage

	var whoare = require('whoare');

	console.log(whoare.you('nodejs.org'));

## Tests

	npm test

	Note: Tests use chai, mocha, rewire, and sinon for mocking.

## Contributing

	PR's accepted. Please follow the existing style and unit testing methodologies in place. Please explain the addition of any dependencies.

	Everything must be unit tested :)

## Release History

* 0.1.0 Initial Commit
* 0.1.1 Removed debugging line
* 0.2.2 Added .tk support
