class Events {
	constructor() {
		this.e = {}
	}
	addEvent(eventName, callBack) {
		if (!this.e.hasOwnProperty(eventName)) this.e[eventName] = []
		this.e[eventName].push(callBack)
	}
	removeEvent(eventName, callBack) {
		if (!this.e.hasOwnProperty(eventName)) return;
		let i = this.e[eventName].indexOf(callBack);
		if (i !== -1) this.e.splice(i, 1);
	}
	callEvent(eventName, params) {
		if (!this.e.hasOwnProperty(eventName)) return;
		for (let i = 0; i < this.e[eventName].length; i++) this.e[eventName][i](params)
	}
}