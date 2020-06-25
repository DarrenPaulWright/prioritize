import { throttle } from 'async-agent';

export default class PriorityQueue {
	constructor() {
		const self = this;
		const check = () => {
			if (self._total === 0 && self._queue.length !== 0) {
				self._queue.shift()();
			}
		};

		self._total = 0;
		self._queue = [];
		self._check = throttle(check, 50, { leading: false });
	}

	add(callback) {
		this._queue.push(callback);
		this._check();
	}

	callStarted() {
		++this._total;
	}

	callDone() {
		--this._total;
		this._check();
	}
}
