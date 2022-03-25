function rand(min, max){ return Math.floor(Math.random() * (max - min + 1)) + min }
var canvas = document.getElementById('demo');
var ctx = canvas.getContext('2d');
var canvas_size = { 'width': 1024, 'height': 400 }

var parray = []
var map_size = { 'x': 17, 'y': 5 }

var square_size = { 'width': 100, 'height': 85, 'shift': { 'x': 0, 'y': 24 } }
var start_point = {
	'x': canvas_size.width/2 - (map_size.x * square_size.width/2)/2 - square_size.width/4,
	'y': canvas_size.height/2 - (map_size.y * (square_size.height - square_size.shift.y))/2
}
for (let y = 0, id = 0; y < map_size.y; y++) {
	for (let x = (y%2===0?0:1); x < map_size.x; x+=2, id++) {
		//id = map_size.y * map_size.x + map_size.x
		parray[ id ] = new Plate(id, { 'x': x, 'y': y })
		parray[ id ].setImage('img/tile.png')
		parray[ id ].setImageSize(square_size)
		parray[ id ].setPath([
			{ 'x': start_point.x + x * square_size.width/2, 'y': canvas_size.height + square_size.height + rand(0, 400) },
			{ 'x': start_point.x + x * square_size.width/2, 'y': start_point.y + y * (square_size.height - square_size.shift.y) }
		])
		parray[ id ].motion()
		//parray[ id ].setPoint({ 'x': start_point.x + x * square_size.width/2, 'y': start_point.y + y * (square_size.height - square_size.shift.y) })
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
setInterval(engine, 25)