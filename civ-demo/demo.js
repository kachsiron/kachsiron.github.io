function rand(min, max){ return Math.floor(Math.random() * (max - min + 1)) + min }
var canvas = document.getElementById('demo');
var ctx = canvas.getContext('2d');
var canvas_size = { 'width': 1024, 'height': 650 }
canvas.width = canvas_size.width
canvas.height = canvas_size.height
var parray = []
var шаблон = [[-1, -1], [1, -1], [2, 0], [1, 1], [-1, 1], [-2, 0]]
var larray = []
var map_size = { 'x': 19, 'y': 10 }
var bioms = {
	'winter': [0, 9],
	'desert': [4, 5],
	'tundra': [1, 8]
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
		parray[ id ].setPath([
			{ 'x': start_point.x + x * square_size.width/2, 'y': canvas_size.height + square_size.height + rand(0, 400) },
			{ 'x': start_point.x + x * square_size.width/2, 'y': start_point.y + y * (square_size.height - square_size.shift.y) }
		])
		parray[ id ].motion()
	}
}
for (let id = 0; id < parray.length; id++) { // LINKS
	for (let t = 0, x, y; t < 6; t++) {
		x = parray[ id ].coordinates.x + шаблон[ t ][0]
		y = parray[ id ].coordinates.y + шаблон[ t ][1]
		if (!checkPoint(x, y)) continue
		parray[ id ].set_link(t, larray[ cid(x, y) ])
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
	ctx.fillStyle = 'black';
	ctx.fillRect(0, 0, canvas_size.width, canvas_size.height);
	for (let i = 0; i < parray.length; i++) {
		ctx.drawImage(parray[ i ].img, parray[ i ].point.x, parray[ i ].point.y, parray[ i ].image_size.width, parray[ i ].image_size.height);
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
	this.path = null
	this.path_index = null
	this.speed = new Vector(0, 0)
	this.acceleration = 0.3
	this.max_speed = 15
	this.friction = 0.9
	this.destination = new Vector(0, 0)
	this.active = 0
	this.end_path = false
	
	this.set_link = function(id, link) {
		this.links[ id ] = link
	}
	this.check_path = function() {
		if (this.end_path) {
			// if (this.speed.length < 1 && this.active === 1) {
				// this.active = 0
				// this.speed.reset()
			// }
			//else
			if (this.speed.length < 1 && this.destination.length < 0.5) {

				this.point.x = this.path[ this.path_index ].x
				this.point.y = this.path[ this.path_index ].y
				this.active = 0
				this.destination.reset()
				this.speed.reset()
				this.path = null
				this.path_index = null
			}
		}
		else if (this.destination.length < 20) {
			if (this.path_index+1 === this.path.length) {
				this.end_path = true
			}
		}
	}
	this.motion = function() {
		if (this.active === 0) return false
		//let p = false
		this.destination.point.x = this.path[ this.path_index ].x - this.point.x
		this.destination.point.y = this.path[ this.path_index ].y - this.point.y
		this.destination.lengthize()
		this.destination.normalize()

		this.speed.point.x += this.destination.norma.x * this.acceleration
		this.speed.point.y += this.destination.norma.y * this.acceleration
		//console.log(this.speed.point.y, this.destination.norma.y, this.acceleration)
		if (this.end_path) {
			this.speed.point.x *= this.friction
			this.speed.point.y *= this.friction
		}
		else{
			//this.speed.point.x *= this.friction[0]
			//this.speed.point.y *= this.friction[0]
		}
		this.speed.lengthize()
		//this.speed.normalize()

		if (this.speed.length > this.max_speed) {
			let l = this.speed.length / this.max_speed
			this.speed.point.x /= l
			this.speed.point.y /= l
		}
		this.speed.lengthize()
		this.point.x += this.speed.point.x
		this.point.y += this.speed.point.y

		return true
	}
	this.setPath = function(path) {
		this.active = 2
		this.path = path
		this.point = { 'x': this.path[ 0 ].x, 'y': this.path[ 0 ].y }
		this.path_index = 1
	}
	this.setPoint = function(point) {
		this.point = point
	}
	this.setImage = function(image_name) {
		this.img.src = image_name
	}
	this.setImageSize = function(size) {
		this.image_size = size
	}
}
var stop = false
function engine() {
	let c = 0
	if (stop) return
	for (let i = 0; i < parray.length; i++) {
		if (parray[ i ].motion()) {
			c++
			parray[ i ].check_path()
		}
	}
	//console.log(c)
	//for (let i = 0; i < parray.length; i++) {
		
	//}
	render()
}
desertGenerator()
tundraGenerator()
winterGenerator()

setInterval(engine, 25)