import { throttle } from 'async-agent';
import { Queue } from 'type-enforcer';

export default class PriorityQueue extends Queue {
	constructor() {
		super();

		const self = this;
		self._currentCallTotal = 0;
		self._check = throttle(
			() => {
				if (self._currentCallTotal === 0 && self.length !== 0) {
					self.triggerFirst();
				}
			},
			50,
			{ leading: false }
		);
	}

	add(callback) {
		super.add(callback);
		this._check();
	}

	callStarted() {
		++this._currentCallTotal;
	}

	callDone() {
		--this._currentCallTotal;
		this._check();
	}
}
