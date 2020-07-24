var kf={
		'att':1,
		'dam':0.75,
		'hp':0.75,
		'ini':0.25,
		'def':1,
		'spd':1
}
var units={
	'Големошок':{
		'att':5,
		'dam':3,
		'hp':4,
		'ini':2,
		'def':3,
		'spd':2
	},
	'Големорех':{
		'att':2,
		'dam':5,
		'hp':5,
		'ini':2,
		'def':4,
		'spd':2
	},
	'Големонуж':{
		'att':3,
		'dam':3,
		'hp':4,
		'ini':2,
		'def':5,
		'spd':2
	},
	'Гушка Ля':{
		'att':6,
		'dam':4,
		'hp':2,
		'ini':6,
		'def':2,
		'spd':5
	},
	'Порфил П.':{
		'att':4,
		'dam':4,
		'hp':7,
		'ini':1,
		'def':4,
		'spd':2
	},
	'Лимонные сёстры':{
		'att':2,
		'dam':1,
		'hp':3,
		'ini':4,
		'def':1,
		'spd':2
	},
	'Зеф Толкатель':{
		'att':3,
		'dam':1,
		'hp':3,
		'ini':4,
		'def':2,
		'spd':4
	}
}
var pars={
	'att':{'a':[], 's': 0, 'm': 0},
	'dam':{'a':[], 's': 0, 'm': 0},
	'hp':{'a':[], 's': 0, 'm': 0},
	'ini':{'a':[], 's': 0, 'm': 0},
	'def':{'a':[], 's': 0, 'm': 0},
	'spd':{'a':[], 's': 0, 'm': 0}
}
for(let j in pars) {
	for(let i = 0; i < 8; i++) {
		pars[j].a[i] = [0, 0]
	}
}
for(let j in pars) {
	for(let i in units) {
		pars[j].a[ units[i][j] ][0]++
		if(pars[j].a[ units[i][j] ][0] > pars[j].m) pars[j].m = pars[j].a[ units[i][j] ][0]
		pars[j].s++
	}
}
for(let j in pars) {
	let s=1
	for(let i = 0; i < pars[j].a.length; i++) {
		if(pars[j].a[ i ][0] === 0) continue
		s += (pars[j].m - pars[j].a[ i ][0] + 1) / pars[j].s
		pars[j].a[ i ][1] = s / 2
	}
}
for(let i in units) {
	let v1 = 1, v2 = 1, s = 0
	for(let j in units[i]) {
		v2 *= Math.pow(units[i][j], pars[j].a[ units[i][j] ][1]) * kf[j]
		v1 *= units[i][j] * kf[j]
		s += units[i][j]
	}
	units[i]['value1'] = Math.round(v1/10)
	units[i]['value2'] = Math.round(v2)
	units[i]['sum'] = s
}
var result = []
for(let i in units){
	result.push([units[i].value1, i])
}
result.sort((a, b) => b[0] - a[0])
for(let i = 0; i < result.length; i++) {
	console.log(result[i][1])
	console.log(units[ result[i][1] ])
}