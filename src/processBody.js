import { isString } from 'type-enforcer';
import { APPLICATION_JSON, CONTENT_TYPE, METHOD } from './constants.js';

export default (settings) => {
	if (
		settings.method !== METHOD.GET &&
		settings.headers[CONTENT_TYPE] === APPLICATION_JSON &&
		!isString(settings.body)
	) {
		settings.body = JSON.stringify(settings.body);
	}
};
