import { forOwn } from 'object-agent';
import { isArray, isObject } from 'type-enforcer';

export default (settings, url) => {
	if ('params' in settings) {
		if (isObject(settings.params)) {
			forOwn(settings.params, (value, key) => {
				if (isObject(value) || isArray(value)) {
					url.searchParams.append(key, JSON.stringify(value));
				}
				else {
					url.searchParams.append(key, value);
				}
			});
		}

		delete settings.params;
	}
};
