import { assert } from 'type-enforcer';
import prioritize from '../src/prioritize.js';

describe('prioritize', () => {
	it('should have property baseUrl', () => {
		assert.is(prioritize.baseUrl.indexOf('http'), 0);
	});

	it('should have default settings', () => {
		assert.equal(prioritize.defaults, { headers: { 'Content-Type': 'application/json' } });
	});
});
