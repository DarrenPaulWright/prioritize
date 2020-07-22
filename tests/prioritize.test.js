import { resolveAfterWith } from 'async-agent';
import { assert } from 'type-enforcer';
import Prioritize from '../src/prioritize.js';

class FetchMock {
	constructor(onFetch) {
		const self = this;

		self._originalFetch = window.fetch;

		window.fetch = (url, settings) => {
			self.url = url;
			self.settings = settings;

			if (onFetch) {
				onFetch(url, settings);
			}
			else {
				self.reset();
			}

			return resolveAfterWith(20, 'response')();
		};
	}

	reset() {
		window.fetch = this._originalFetch;
	}
}

describe('prioritize', () => {
	it('should have property baseUrl', () => {
		const prioritize = new Prioritize();

		assert.is(prioritize.baseUrl.indexOf('http'), 0);
	});

	it('should have default settings', () => {
		const prioritize = new Prioritize();

		assert.equal(prioritize.defaults, { headers: { 'Content-Type': 'application/json' } });
	});

	it('should wait to call if priority is low', (done) => {
		const prioritize = new Prioritize();
		const allUrls = [];

		const mock = new FetchMock((url) => {
			allUrls.push(url.pathname);
		});

		prioritize.get('/first');
		prioritize.get('/second', { priority: 'low' })
			.then((response) => {
				assert.is(response, 'response');
				assert.equal(allUrls, ['/first', '/third', '/second']);
				mock.reset();
				done();
			});
		prioritize.get('/third');
	});

	describe('shortcuts', () => {
		it('should add appropriate method when get is called', () => {
			const prioritize = new Prioritize();
			const mock = new FetchMock();

			return prioritize.get('/api/v1', { params: { a: 1, b: 2 } })
				.then((response) => {
					assert.is(response, 'response');
					assert.is(mock.url.pathname, '/api/v1');
					assert.is(mock.url.search, '?a=1&b=2');
					assert.is(mock.settings.method, 'GET');
				});
		});

		it('should add appropriate method when patch is called', () => {
			const prioritize = new Prioritize();
			const mock = new FetchMock();

			return prioritize.patch('/api/v1', { body: { a: 1 } })
				.then((response) => {
					assert.is(response, 'response');
					assert.is(mock.url.pathname, '/api/v1');
					assert.is(mock.settings.body, '{"a":1}');
					assert.is(mock.settings.method, 'PATCH');
				});
		});

		it('should add appropriate method when put is called', () => {
			const prioritize = new Prioritize();
			const mock = new FetchMock();

			return prioritize.put('/api/v1', { body: { a: 1 } })
				.then((response) => {
					assert.is(response, 'response');
					assert.is(mock.url.pathname, '/api/v1');
					assert.is(mock.settings.body, '{"a":1}');
					assert.is(mock.settings.method, 'PUT');
				});
		});

		it('should add appropriate method when post is called', () => {
			const prioritize = new Prioritize();
			const mock = new FetchMock();

			return prioritize.post('/api/v1', { body: { a: 1 } })
				.then((response) => {
					assert.is(response, 'response');
					assert.is(mock.url.pathname, '/api/v1');
					assert.is(mock.settings.body, '{"a":1}');
					assert.is(mock.settings.method, 'POST');
				});
		});

		it('should add appropriate method when delete is called', () => {
			const prioritize = new Prioritize();
			const mock = new FetchMock();

			return prioritize.delete('/api/v1', { body: { a: 1 } })
				.then((response) => {
					assert.is(response, 'response');
					assert.is(mock.url.pathname, '/api/v1');
					assert.is(mock.settings.body, '{"a":1}');
					assert.is(mock.settings.method, 'DELETE');
				});
		});
	});
});
