function rand(min, max){ return Math.floor(Math.random() * (max - min + 1)) + min }
var canvas = document.getElementById('demo');
var ctx = canvas.getContext('2d');
var canvas_size = { 'width': window.innerWidth - 15, 'height': window.innerHeight - 15 }
canvas.width = canvas_size.width
canvas.height = canvas_size.height
var parray = []
var шаблон = [[-1, -1], [1, -1], [2, 0], [1, 1], [-1, 1], [-2, 0]]
var larray = []
var map_size = { 'x': 19, 'y': 9 }
var bioms = {
	'winter': [0, 9],
	'desert': [4, 5],
	'tundra': [1, 8]
}
var canvas_data = { 'x': 0, 'y': 0, 'press': false, 'move': false, 'scale': 1 }
canvas.onwheel = function(e) {
	//if (e.deltaY > 0) canvas_data.scale += 0.1
	//else canvas_data.scale -= 0.1
	//ctx.scale(canvas_data.scale, canvas_data.scale)
}
canvas.onmousedown = function(e) {
	e.preventDefault()
	canvas_data.x = e.clientX
	canvas_data.y = e.clientY
	canvas_data.press = true
}
canvas.onmousemove = function(e) {
	e.preventDefault()
	if (canvas_data.press) {
		start_point.x +=  e.clientX - canvas_data.x
		start_point.y += e.clientY - canvas_data.y

		canvas_data.x = e.clientX
		canvas_data.y = e.clientY
		canvas_data.move = true
	}
}

canvas.onmouseup = function(e) {
	e.preventDefault()
	if (!canvas_data.move) {
		let x = e.clientX - start_point.x
		let y = e.clientY - start_point.y
		for (let i = 0; i < parray.length; i++) {
			if (
				x > parray[ i ].point.x &&
				x < parray[ i ].point.x + square_size.width &&
				y > parray[ i ].point.y &&
				y < parray[ i ].point.y + square_size.height
			) {
				parray[ i ].setImage('img/tile' + rand(1,4) + '.png')
			}
		}
	}
	canvas_data.x = 0
	canvas_data.y = 0
	canvas_data.press = false
	canvas_data.move = false
}
canvas.onclick = function(e) {


}
function getDirection(x, y) {
	if (x < 0) x /= Math.abs(x)
	else x /= x
	if (y < 0) y /= Math.abs(y)
	else y /= y
	if (x < 0 && y < 0) return шаблон[0] // вверхвлево
	if (x > 0 && y < 0) return шаблон[1] // вверхвправо
	if (x > 0 && y === 0) return шаблон[2]
	if (x > 0 && y > 0) return шаблон[3]
	if (x < 0 && y > 0) return шаблон[4]
	if (x < 0 && y === 0) return шаблон[5]
}

var square_size = { 'width': 100, 'height': 85, 'shift': { 'x': 0, 'y': 24 } }
var start_point = {
	'x': canvas_size.width/2 - (map_size.x * square_size.width/2)/2 - square_size.width/4,
	'y': canvas_size.height/2 - (map_size.y * (square_size.height - square_size.shift.y))/2 - square_size.height/4
}
function cid(x, y) { return y * map_size.y + x } // for larray
for (let y = 0, id = 0; y < map_size.y; y++) {
	for (let x = (y%2===0?0:1); x < map_size.x; x+=2, id++) {
		//id = map_size.y * map_size.x + map_size.x
		parray[ id ] = new Plate(id, { 'x': x, 'y': y })
		larray[ cid(x, y) ] = parray[ id ]
		parray[ id ].setImage('img/tile1.png')
		parray[ id ].setImageSize(square_size)
		
		parray[ id ].setPosition({ 'x': x * square_size.width/2, 'y': canvas_size.height + square_size.height + rand(0, 400) + y * (square_size.height - square_size.shift.y) })
		parray[ id ].addTask(opacity.bind(parray[ id ], { 'start': 0, 'duration': 60 }))
		parray[ id ].addTask(motion.bind(parray[ id ], {
			'path': [
				{ 'x': x * square_size.width/2, 'y': y * (square_size.height - square_size.shift.y) }
			],
			'destination': new Vector(0, 0),
			'end_path': false,
			'path_index': 0
		}))
	}
}
for (let id = 0; id < parray.length; id++) { // LINKS
	for (let t = 0, x, y; t < 6; t++) {
		x = parray[ id ].coordinates.x + шаблон[ t ][0]
		y = parray[ id ].coordinates.y + шаблон[ t ][1]
		if (!checkPoint(x, y)) continue
		parray[ id ].setLink(t, larray[ cid(x, y) ])
	}
}
function checkPoint(x, y) {
	if (x < 0 || x >= map_size.x) return false
	if (y < 0 || y >= map_size.y) return false
	return true
}
function getDistance(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2))
}
function desertGenerator() {
    let rar = []
    //for (let x = 0; x < map_size.x; x++) {
    //    rar.push([1, [ x, bioms.desert[0] ]])
    //    rar.push([1, [ x, bioms.desert[1] ]])
    //}
    for (let i = 0; i < 12; i++) {
        rar.push([rand(1,2), [
            rand( 0, map_size.x-1 ),
            rand(bioms.desert[0], bioms.desert[1])
        ]])
    }
    for (let cx, cy, j = 0; j < rar.length; j++) {
        cx = rar[j][1][0]
        cy = rar[j][1][1]
        radius = rar[j][0]
        for (let i = 0, dist; i < parray.length; i++) {
            dist = getDistance(parray[i].coordinates.x, parray[i].coordinates.y, cx, cy)
            if (dist <= radius) {
                if ((100 - 100 / radius * dist) >= rand(0, 100)) {
                    parray[i].setImage('img/tile2.png')
                }
            }
        }
    }
}
function tundraGenerator() {
    let rar = []
    for (let x = 0; x < map_size.x; x++) {
        rar.push([1, [ x, bioms.tundra[0] ]])
        rar.push([1, [ x, bioms.tundra[1] ]])
    }
    for (let i = 0; i < 6; i++) {
        rar.push([2, [
            rand( 0, map_size.x-1 ),
            bioms.tundra[0]
        ]])
        rar.push([2, [
            rand( 0, map_size.x-1 ),
            bioms.tundra[1]
        ]])
    }
    for (let cx, cy, j = 0; j < rar.length; j++) {
        cx = rar[j][1][0]
        cy = rar[j][1][1]
        radius = rar[j][0]
        for (let i = 0, dist; i < parray.length; i++) {
            dist = getDistance(parray[i].coordinates.x, parray[i].coordinates.y, cx, cy)
            if (dist <= radius) {
                if ((100 - 100 / radius * dist) >= rand(0, 100)) {
                    parray[i].setImage('img/tile4.png')
                }
            }
        }
    }
}
function winterGenerator() {
    let rar = []
    for (let x = 0; x < map_size.x; x++) {
        rar.push([1, [ x, bioms.winter[0] ]])
        rar.push([1, [ x, bioms.winter[1] ], 1])
    }
    for (let i = 0; i < 6; i++) {
        rar.push([2, [
            rand( 0, map_size.x-1 ),
            bioms.winter[0]
        ]])
        rar.push([2, [
            rand( 0, map_size.x-1 ),
            bioms.winter[1]
        ]])
    }

    for (let i = 0, dist; i < parray.length; i++) {
		for (let cx, cy, j = 0; j < rar.length; j++) {
			cx = rar[j][1][0]
			cy = rar[j][1][1]
			radius = rar[j][0]
            dist = getDistance(parray[i].coordinates.x, parray[i].coordinates.y, cx, cy)
            if (dist <= radius) {
                if ((100 - 100 / radius * dist) >= rand(0, 100)) {
                    parray[i].setImage('img/tile3.png')
                }
            }
        }
    }
}

function render() {
	ctx.globalAlpha = 1
	
	ctx.fillStyle = 'black';
	ctx.fillRect(0, 0, canvas_size.width, canvas_size.height);
	for (let i = 0; i < parray.length; i++) {
		ctx.globalAlpha = parray[ i ].alpha
		
		ctx.drawImage(parray[ i ].img, start_point.x + parray[ i ].point.x, start_point.y + parray[ i ].point.y, parray[ i ].image_size.width, parray[ i ].image_size.height);
	}

}

function Vector(x, y) {
	this.point = { 'x': x, 'y': y }
	this.length = 0
	this.norma = { 'x': 0, 'y': 0 }
	this.lengthize = function() {
		this.length = Math.sqrt(Math.pow(this.point.x, 2) + Math.pow(this.point.y, 2))
	}
	this.normalize = function() {
		if (this.length > 0) {
			this.norma.x = this.point.x / this.length 
			this.norma.y = this.point.y / this.length
		}
		else {
			this.norma.x = 0
			this.norma.y = 0
		}
	}
	this.reset = function() {
		this.point.x = 0
		this.point.y = 0
	}
	this.lengthize()
	this.normalize()
}
function Plate(id, coordinates) {
	this.coordinates = coordinates
	this.id = id
	this.links = [null, null, null, null, null, null]
	this.point = null
	this.image_size = null
	this.img = new Image()
	this.speed = new Vector(0, 0)
	this.acceleration = 0.3
	this.max_speed = 18
	this.alpha = 1
	this.friction = [0.9, 0.8, 0.7]

	//this.active = 0
	
	this.tasks = []
	this.doTasks = function() {
		for (let i = this.tasks.length; --i > -1; ) {
			if (this.tasks[ i ]()) this.tasks.splice(i, 1)
		}
	}
	this.setImage = function(image_name) {
		this.img.src = image_name
	}
	this.setImageSize = function(size) {
		this.image_size = size
	}
	this.setPosition = function(pos) {
		this.point = pos
	}
	this.setLink = function(id, link) {
		this.links[ id ] = link
	}
	this.addTask = function(fun) {
		this.tasks.push( fun )
	}
}
function opacity(data) {
	data.start += 1 / data.duration
	if (data.start >= 1) {
		this.alpha = 1
		return true
	}
	this.alpha = data.start
	return false
}
function motion(data) {
	if (data.end_path) {
		//console.log(this.speed.length,data.destination.length)
		if (this.speed.length < 1 && data.destination.length < 0.5) {
			this.point.x = data.path[ data.path_index ].x
			this.point.y = data.path[ data.path_index ].y
			this.speed.reset()
			return true
		}
	}
	else if (data.destination.length < 20) {
		if (data.path_index+1 === data.path.length) {
			data.end_path = true
		}
	}

	data.destination.point.x = data.path[ data.path_index ].x - this.point.x
	data.destination.point.y = data.path[ data.path_index ].y - this.point.y
	data.destination.lengthize()
	data.destination.normalize()

	this.speed.point.x += data.destination.norma.x * this.acceleration
	this.speed.point.y += data.destination.norma.y * this.acceleration

	if (data.destination.length < 100) {
		let fr = 2
		if (data.destination.length > 30) fr = 0
		else if (data.destination.length > 15) fr = 1
		//else fr = 2
		this.speed.point.x *= this.friction[ fr ]
		this.speed.point.y *= this.friction[ fr ]
	}
	else {
		this.speed.lengthize()
		if (this.speed.length > this.max_speed) {
			let l = this.speed.length / this.max_speed
			this.speed.point.x /= l
			this.speed.point.y /= l
		}
	}
	this.speed.lengthize()
	this.point.x += this.speed.point.x
	this.point.y += this.speed.point.y

	return false
}
var stop = false
function engine() {

	if (stop) return
	for (let i = 0; i < parray.length; i++) {
		parray[ i ].doTasks()
	}

	render()
}
desertGenerator()
tundraGenerator()
winterGenerator()

setInterval(engine, 1000/50)