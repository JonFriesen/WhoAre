var should = require('chai').should(),
		rewire = require('rewire'),
		whoare = rewire('../index.js'),
		you = whoare.you,
		getTLD = whoare.__get__('getTLD'),
		getWhoIs = whoare.__get__('getWhoIs'),
		getWhoIsServer = whoare.__get__('getWhoIsServer'),
		validateDomain = whoare.__get__('validateDomain');

// getTLD tests
describe('getTLD', function() {
	it('converts jonfriesen.ca to ca', function(){
		getTLD('jonfriesen.ca').should.equal('ca');
	});

	it('converts http://jonfriesen.ca to ca', function(){
		getTLD('http://jonfriesen.ca').should.equal('ca');
	});

	it('converts test.co.uk to uk', function(){
		getTLD('test.co.uk').should.equal('uk');
	});

	it('converts test to test', function(){
		getTLD('test').should.equal('test');
	});
});

// validateDomain tests
describe('validateDomain', function(){
	it('returns true for jonfriesen.ca', function(){
		validateDomain('jonfriesen.ca').should.equal(true);
	});

	it('returns true for www.jonfriesen.ca', function(){
		validateDomain('www.jonfriesen.ca').should.equal(true);
	});

	it('returns true for test.co.uk', function(){
		validateDomain('test.co.uk').should.equal(true);
	});

	it('returns false for notAWebsite', function(){
		validateDomain('notAWebsite').should.equal(false);
	});
});