'use strict';

class GeneralProcessor {
	configure(cfg) {
		this._cfg = cfg;
		this._prevdata = false;
		return this;
	}

	process(res) {
		this.memoize(res);
		return this;
	}

	memoize(data) {
		this._prevdata = data;
	}

	pipe(processor) {
		if (!processor) return;
		processor.configure(this._cfg);
		return processor.process(this._prevdata);
	}

}

module.exports = GeneralProcessor;