import { assert } from 'type-enforcer';
import appendParameters from '../src/appendParameters.js';

describe('appendParameters', () => {
	it('should append a simple value', () => {
		const url = new URL('http://www.example.com');
		const settings = { params: { a: 1 } };

		appendParameters(settings, url);

		assert.is(url.searchParams.toString(), 'a=1');
	});

	it('should append a deep object', () => {
		const url = new URL('http://www.example.com');
		const settings = { params: { a: { b: { c: 1, d: 2 } } } };

		appendParameters(settings, url);

		const output = url.searchParams.toString();

		assert.is(output, 'a=%7B%22b%22%3A%7B%22c%22%3A1%2C%22d%22%3A2%7D%7D');
		assert.is(decodeURIComponent(output), 'a={"b":{"c":1,"d":2}}');
	});

	it('should append an array', () => {
		const url = new URL('http://www.example.com');
		const settings = { params: { a: [1, 'meh', { b: 1 }] } };

		appendParameters(settings, url);

		const output = url.searchParams.toString();

		assert.is(output, 'a=%5B1%2C%22meh%22%2C%7B%22b%22%3A1%7D%5D');
		assert.is(decodeURIComponent(output), 'a=[1,"meh",{"b":1}]');
	});
});
