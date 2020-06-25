import appendParameters from './appendParameters.js';
import { APPLICATION_JSON, CONTENT_TYPE, METHOD } from './constants.js';
import PriorityQueue from './PriorityQueue.js';
import processBody from './processBody.js';

const defaults = { headers: {} };
defaults.headers[CONTENT_TYPE] = APPLICATION_JSON;

const priorityQueue = new PriorityQueue();

/**
 * @summary
 * A light wrapper on fetch to facilitate prioritization of calls.
 *
 * ```
 * npm install prioritize
 * ```
 * @module prioritize
 */
const prioritize = {
	/**
	 * A baseUrl to prepend to the url for each call to fetch
	 *
	 * @memberOf module:prioritize
	 * @default window.location.protocol + '//' + window.location.host
	 */
	baseUrl: window.location.protocol + '//' + window.location.host,

	/**
	 * Default settings for each call to fetch.
	 *
	 * @memberOf module:prioritize
	 * @default { headers: { 'Content-Type': 'application/json' } }
	 */
	defaults,

	/**
	 * Prioritized call to fetch.
	 *
	 * @memberOf module:prioritize
	 * @static
	 *
	 * @param {string} url - URL to call
	 * @param {object} [settings] - All settings available to fetch.<br>
	 * - Adds any default settings from prioritize.defaults.<br>
	 * - settings.body is passed through JSON.stringify() if appropriate.
	 * @param {string} [settings.priority] - If set to "low" then this call is added to a queue until all previously added calls are complete.
	 * @param {object} [settings.params] - Search parameters to append to the url. example: `{ a: 1 }` => `?a=1`
	 *
	 * @returns {Promise} Should be handled like a normal call to fetch
	 */
	fetch(url, settings) {
		const fullUrl = new URL(url, prioritize.baseUrl);

		settings = { ...prioritize.defaults, ...settings };

		appendParameters(settings, fullUrl);
		processBody(settings);

		return new Promise((resolve) => {
			const doFetch = () => {
				priorityQueue.callStarted();

				fetch(fullUrl, settings)
					.then((response) => {
						priorityQueue.callDone();
						resolve(response);
					});
			};

			if (settings.priority === 'low') {
				delete settings.priority;
				priorityQueue.add(doFetch);
			}
			else {
				doFetch();
			}
		});
	},

	/**
	 * Shortcut to prioritize.fetch with method: 'GET'.
	 *
	 * @memberOf module:prioritize
	 * @static
	 *
	 * @param {string} url - URL to call
	 * @param {object} [settings] - Passed to prioritize.fetch with method: 'GET'
	 *
	 * @returns {Promise} Should be handled like a normal call to fetch
	 */
	get(url, settings) {
		return this.fetch(url, { ...settings, method: METHOD.GET });
	},

	/**
	 * Shortcut to prioritize.fetch with method: 'PATCH'.
	 *
	 * @memberOf module:prioritize
	 * @static
	 *
	 * @param {string} url - URL to call.
	 * @param {object} [settings] - Passed to prioritize.fetch with method: 'PATCH'
	 *
	 * @returns {Promise} Should be handled like a normal call to fetch
	 */
	patch(url, settings) {
		return this.fetch(url, { ...settings, method: METHOD.PATCH });
	},

	/**
	 * Shortcut to prioritize.fetch with method: 'PUT'.
	 *
	 * @memberOf module:prioritize
	 * @static
	 *
	 * @param {string} url - URL to call
	 * @param {object} [settings] - Passed to prioritize.fetch with method: 'PUT'
	 *
	 * @returns {Promise} Should be handled like a normal call to fetch
	 */
	put(url, settings) {
		return this.fetch(url, { ...settings, method: METHOD.PUT });
	},

	/**
	 * Shortcut to prioritize.fetch with method: 'POST'.
	 *
	 * @memberOf module:prioritize
	 * @static
	 *
	 * @param {string} url - URL to call
	 * @param {object} [settings] - Passed to prioritize.fetch with method: 'POST'
	 *
	 * @returns {Promise} Should be handled like a normal call to fetch
	 */
	post(url, settings) {
		return this.fetch(url, { ...settings, method: METHOD.POST });
	},

	/**
	 * Shortcut to prioritize.fetch with method: 'DELETE'.
	 *
	 * @memberOf module:prioritize
	 * @static
	 *
	 * @param {string} url - URL to call
	 * @param {object} [settings] - Passed to prioritize.fetch with method: 'DELETE'
	 *
	 * @returns {Promise} Should be handled like a normal call to fetch
	 */
	delete(url, settings) {
		return this.fetch(url, { ...settings, method: METHOD.DELETE });
	}
};

export default prioritize;
