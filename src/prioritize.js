import appendParameters from './appendParameters.js';
import { APPLICATION_JSON, CONTENT_TYPE, METHOD } from './constants.js';
import PriorityQueue from './PriorityQueue.js';
import processBody from './processBody.js';

const QUEUE = Symbol();

/**
 * @summary
 * A light wrapper on fetch to facilitate prioritization of calls.
 *
 * ```
 * npm install prioritize
 * ```
 *
 * @class Prioritize
 */
export default class Prioritize {
	constructor() {
		/**
		 * A baseUrl to prepend to the url for each call to fetch.
		 *
		 * @member baseUrl
		 * @memberOf Prioritize
		 * @instance
		 * @default window.location.protocol + '//' + window.location.host
		 */
		this.baseUrl = window.location.protocol + '//' + window.location.host;

		/**
		 * Default settings for each call to fetch.
		 *
		 * @member defaults
		 * @memberOf Prioritize
		 * @instance
		 * @default { headers: { 'Content-Type': 'application/json' } }
		 */
		this.defaults = { headers: {} };
		this.defaults.headers[CONTENT_TYPE] = APPLICATION_JSON;

		this[QUEUE] = new PriorityQueue();
	}

	/**
	 * Prioritized call to fetch.
	 *
	 * @memberOf Prioritize
	 * @instance
	 *
	 * @param {string} url - URL to call.
	 * @param {object} [settings] - All settings available to fetch.<br> - Adds any default settings from `prioritize.defaults`.<br> - `settings.body` is passed through `JSON.stringify()` if appropriate.
	 * @param {string} [settings.priority] - If set to "low" then this call is added to a queue until all ongoing calls are complete.
	 * @param {object} [settings.params] - Search parameters to append to the url. example: `{ a: 1 } => ?a=1`. Objects and Arrays are passed through `JSON.stringify()`.
	 *
	 * @returns {Promise} Should be handled like a normal call to fetch.
	 */
	fetch(url, settings) {
		const fullUrl = new URL(url, this.baseUrl);

		settings = { ...this.defaults, ...settings };

		appendParameters(settings, fullUrl);
		processBody(settings);

		return new Promise((resolve, reject) => {
			const doFetch = () => {
				this[QUEUE].callStarted();

				fetch(fullUrl, settings)
					.then((response) => {
						this[QUEUE].callDone();
						resolve(response);
					})
					.catch(reject);
			};

			if (settings.priority === 'low') {
				delete settings.priority;
				this[QUEUE].add(doFetch);
			}
			else {
				doFetch();
			}
		});
	}

	/**
	 * Shortcut to `prioritize.fetch` with `method: 'GET'`.
	 *
	 * @memberOf Prioritize
	 * @instance
	 *
	 * @param {string} url - URL to call.
	 * @param {object} [settings] - Passed to `prioritize.fetch` with `method: 'GET'`.
	 *
	 * @returns {Promise} Should be handled like a normal call to fetch.
	 */
	get(url, settings) {
		return this.fetch(url, { ...settings, method: METHOD.GET });
	}

	/**
	 * Shortcut to `prioritize.fetch` with `method: 'PATCH'`.
	 *
	 * @memberOf Prioritize
	 * @instance
	 *
	 * @param {string} url - URL to call.
	 * @param {object} [settings] - Passed to `prioritize.fetch` with `method: 'PATCH'`.
	 *
	 * @returns {Promise} Should be handled like a normal call to fetch.
	 */
	patch(url, settings) {
		return this.fetch(url, { ...settings, method: METHOD.PATCH });
	}

	/**
	 * Shortcut to `prioritize.fetch` with `method: 'PUT'`.
	 *
	 * @memberOf Prioritize
	 * @instance
	 *
	 * @param {string} url - URL to call.
	 * @param {object} [settings] - Passed to `prioritize.fetch` with `method: 'PUT'`.
	 *
	 * @returns {Promise} Should be handled like a normal call to fetch.
	 */
	put(url, settings) {
		return this.fetch(url, { ...settings, method: METHOD.PUT });
	}

	/**
	 * Shortcut to `prioritize.fetch` with `method: 'POST'`.
	 *
	 * @memberOf Prioritize
	 * @instance
	 *
	 * @param {string} url - URL to call.
	 * @param {object} [settings] - Passed to `prioritize.fetch` with `method: 'POST'`.
	 *
	 * @returns {Promise} Should be handled like a normal call to fetch.
	 */
	post(url, settings) {
		return this.fetch(url, { ...settings, method: METHOD.POST });
	}

	/**
	 * Shortcut to `prioritize.fetch` with `method: 'DELETE'`.
	 *
	 * @memberOf Prioritize
	 * @instance
	 *
	 * @param {string} url - URL to call.
	 * @param {object} [settings] - Passed to `prioritize.fetch` with `method: 'DELETE'`.
	 *
	 * @returns {Promise} Should be handled like a normal call to fetch.
	 */
	delete(url, settings) {
		return this.fetch(url, { ...settings, method: METHOD.DELETE });
	}
}
