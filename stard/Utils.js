function rand(min,max){return Math.floor(Math.random()*(max-min+1))+min}
Number.prototype.totwo=function(v){
	let s = this.toString(), t = '';
	for (let i = s.length; i < v; i++) t += '0'

	return t + s
}