import { forOwn } from 'object-agent';
import { isObject } from 'type-enforcer';

export default (settings, url) => {
	if ('params' in settings) {
		if (isObject(settings.params)) {
			forOwn(settings.params, (value, key) => {
				url.searchParams.append(key, JSON.stringify(value));
			});
		}

		delete settings.params;
	}
};
