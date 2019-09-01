 // размер окна
var windowSize = {
	'width': window.innerWidth,
	'height': window.innerHeight,
	'padding': { 'bottom': 10, 'left': 10 }
};
var numPlayers = 1;
 
var map = new Mapp();
map.setSize(21, 21); // кол-во клеток

var camera = new Camera(map.divs.main, map, windowSize);
camera.setCellSize(64, 32); // размер клеток
camera.setCellCenter(32, 20);
camera.setUnitShift(32);
camera.setCellShift(18);

var events = new Events();

let plods = [];
for (let i = 0; i < 2; i++) plods.push([ 0, rand(0,13), rand(0,13) ]);
for (let i = 0; i < 4; i++) plods.push([ 1, rand(0,13), rand(0,13) ]);

for (let y = 0; y < map.size.height; y++) {
	for (let x = 0, c, e; x < map.size.width; x++) {
		e = createCell('soil', x, y);
		c = 0;
		for (let i = 0, p; i < 6; i++) {
			
			p = (Math.pow(x - plods[i][1], 2) + Math.pow(y - plods[i][2], 2));
			if (p === 0) p = 1;
			p = Math.pow(p, 0.4)
			p = 100 / p; // c = -200 / +400
			if (plods[i][0] === 0) c -= p;
			else c += p;

		}
		if (c < 0) c /= 100
		else if (c > 0) c /= 200
		e.setPlod(0.5 + c);
		if (rand(1,5)===5) e.toSeed('grass')
	}
}
/* for (let y = 0; y < map.size.height; y++) {
	for (let x = 0, e; x < map.size.width; x++) {
		e = map.getCell(x, y);
		if (e.plod < 0.2) {
			if (!map.mislaid(x - 1, y) && !map.mislaid(x + 1, y)) {
				let e1 = map.getCell(x - 1, y);
				let e2 = map.getCell(x + 1, y);
				if (e1.plod < 0.2 && e2.plod < 0.2) {
					e.imgs.grass.src = 'img/grass_1_02.png';
				}
			}
		}
	}
} */
//map.makeCell('road', 1, 1);


events.addEvent('unit_stand', function(params) {
	let [x, y] = params;
	let c = map.getCell(x, y), d = 0, g = [-5, -7, -8, -7, -5, 0];
	let interval = setInterval(() => {
		d++;
		c.imgs.plant.style.transform = 'rotate(' + g[d] + 'deg)';
		if (d === 5) clearInterval(interval);
	}, 50);
});
events.addEvent('unit_move', function(params) {
	let [unit, x, y] = params;
	
	let d = 1;
	let sx = unit.realPosition.x;
	let sy = unit.realPosition.y;
	let [rx, ry] = camera.getUnitRealPosition(x, y);
	let dx = (rx - sx) / 10;
	let dy = (ry - sy) / 10;
	
	let ax = rx - sx;
	let ay = ry - sy;
	if (Math.abs(ax) > Math.abs(ay)) unit.direction = (ax < 0 ? 3 : 1);
	else unit.direction = (ay < 0 ? 0 : 2);
	unit.setAnim('walk');

	unit.setRealPosition(sx + dx * d, sy + dy * d);
	unit.moveInterval = setInterval(() => {
		d++;
		unit.setRealPosition(sx + dx * d, sy + dy * d);
		camera.moveOn(unit.realPosition.x, unit.realPosition.y);
		if (d === 7) events.callEvent('unit_stand', [x, y]);
		if (d > 9) {
			unit.setAnim('stand');
			clearInterval(unit.moveInterval);
			unit.moveInterval = null
		}
	}, 50)
});
function leafdown(l) {
	for (let i = 0; i < l; i++)  {
		let img = document.createElement('IMG');
		img.src = 'img/unit/unit' + rand(1, 2) + '_w.png';
		img.style.height = img.style.width = rand(10, 25) + 'px';
		img.style.position = 'absolute';
		img.style.zIndex = 3;
		map.divs.cells.appendChild(img);
		let y = -camera.cellSize.unitShift, x = rand(0, camera.width), sx, sy;
		let i = 0, gy = 1 + (-0.5 + rand(0, 10) / 10), gx = 3 + -6 + rand(0, 6), dy = [-10, 0, 180, 180 / 125], dx = [75, 0, 360, 360 / 125];
		let r = [90, 0, 360, 360 / 125];
		img.style.left = x;
		img.style.top = y;
		let interval = setInterval(() => {
			y += gy;
			x += gx;
			dy[1] += dy[3];
			dx[1] += dx[3];
			r[1] += r[3];
			if (dy[1] >= dy[2]) dy[1] = 0;
			if (dx[1] >= dx[2]) dx[1] = 0;
			if (r[1] >= r[2]) r[1] = 0;
			sy = y - Math.sin(dy[1] * Math.PI / 180) * dy[0];
			sx = x - Math.sin(dx[1] * Math.PI / 180) * dx[0];

			img.style.left = sx;
			img.style.top = sy;
			img.style.transform = 'rotate(' + Math.sin(r[1] * Math.PI / 180) * r[0] + 'deg)';
			if (x > camera.width || y > camera.height) {
				img.remove();
				leafdown(1)
				clearInterval(interval);
			}
			else if (++i > 50) {
				if (rand(0, 1000) < 2) {
					let d = 0;
					clearInterval(interval);
					interval = setInterval(() => {
						img.style.opacity = 1 - d / 20;
						if (d > 20) {
							img.remove();
							leafdown(1);
							clearInterval(interval);
						}
						d++
					}, 50);
				}
			}
		}, 25)
	}
}
//leafdown(50)
document.body.appendChild(map.divs.main);
document.body.style.width = windowSize.width + 'px';
document.body.style.height = windowSize.height + 'px';

var keys = [
	[ 'w', 'a', 's', 'd' ],
	[ 'ArrowUp', 'ArrowLeft', 'ArrowDown', 'ArrowRight' ]
], keyp = {};
for (let i = 0; i < keys.length; i++) {
	for (let j = 0; j < keys[i].length; j++) keyp[ keys[i][j] ] = false;
}

var engineInterval = null
document.body.onkeyup = function(e) {
	keyp[ e.key ] = false;
	for (let i = 0, p; i < numPlayers; i++) {
		p = players[i];
		for (let j in p.controller.keys) {
			if (p.controller.keys[j][0] === e.key) {
				p.controller.keys[j][1] = false;
				
				let stop = true;
				for (let j in p.controller.keys) {
					if (p.controller.keys[j][1]) { stop = false; break }
				}
				if (stop) p.controller.pressed = false
				
				break
			}
		}
	}
}
document.body.onkeydown = function(e) {
	if (keyp[ e.key ]) return;
	keyp[ e.key ] = true;

	xiv:for (let i = 0, p; i < numPlayers; i++) {
		p = players[i];
		for (let j in p.controller.keys) {
			if (p.controller.keys[j][0] === e.key) {
				p.controller.keys[j][1] = true;
				p.controller.pressed = true
				break xiv
			}
		}
	}

	if (engineInterval === null) engineInterval = setInterval(engine, 50);
}
function engine() {
	let stop = true;
	for (let i = 0, x, y, p; i < numPlayers; i++) {
		p = players[i];
		if (p.body.moveInterval === null) {
			x = 0 - p.controller.keys.left[1] + p.controller.keys.right[1];
			y = 0 - p.controller.keys.up[1] + p.controller.keys.down[1];
			if (x !== 0 || y !== 0) {
				x = p.body.position.x + x;
				y = p.body.position.y + y;
				moveUnit(p.body, x, y)
			}
		}
		if (p.controller.pressed) stop = false;
	}
	if (stop) {
		clearInterval(engineInterval);
		engineInterval = null
	}
}
function createCell(type, x, y) {
	let c = map.makeCell(type, x, y);
	camera.refresh(c);
	return c
}
function createUnit(type) {
	let c = new Unit();
	units.push(c);
	c.convert(type);
	camera.refresh(c);
	map.divs.cells.appendChild(c.div);
	return c
}
function moveUnit(unit, x, y) {
	if (map.mislaid(x, y) || !moveUnitPrecheck(x, y)) return false;
	if (unit.position.x === x && unit.position.y === y) return false;
	map.getCell(unit.position.x, unit.position.y).removeUnit(unit);
	
	let c = map.getCell(x, y);
	c.putUnit(unit);
	events.callEvent('unit_move', [unit, x, y]);
	return true
}
function moveUnitPrecheck(x, y) {
	let c = map.getCell(x, y);
	if (c.unit !== null) return false
	return true
}
function putUnit(unit, x, y) {
	if (unit.onMap) map.getCell(unit.position.x, unit.position.y).removeUnit(unit);
	unit.onMap = true;
	map.getCell(x, y).putUnit(unit);
	let [rx, ry] = camera.getUnitRealPosition(x, y);
	unit.setRealPosition(rx, ry)
}


/* var pathDivs = [];
function showPath(unit, cx, cy) {
	let p = [[-1, 0], [0, -1], [1, 0], [0, 1]];
	for(let i = 0, d, x, y, c; i < 4; i++) {
		x = cx + p[i][0];
		y = cy + p[i][1];
		
		if (checkUnitPassability(unit, x, y)) {
			d = document.createElement('DIV');
			d.style.left = (cellSize.width * x) + 'px';
			d.style.top = (cellSize.height * y) + 'px';
			d.style.width = cellSize.width + 'px';
			d.style.height = cellSize.height + 'px';
			d.className = 'path_div';
			map.divs.cursor.appendChild(d);
			pathDivs.push(d)
		}
	}
}
function checkUnitPassability(unit, x, y) {
	if (!map.mislaid(x, y)) {
		let c = map.getCell(x, y);
		if (c.unit === null && unit.movePoints - c.obstruction >= 0) return true
		return false
	}
	return false
}
function removePath() {
	for (let i in pathDivs) pathDivs[i].remove();
	pathDivs = []
} */
var players = [];
var units = [];
for (let i = 0, p; i < numPlayers; i++) {
	p = new Player(i);
	p.setController(keys[i])
	players.push(p)
}
let u = createUnit('unit1');
players[0].setBody(u);
putUnit(u, 0, 0);

//u = createUnit('unit2');
//players[1].setBody(u);
//putUnit(u, 0, 1);

camera.moveOnCell(u.position)

//putUnit(createUnit('unit2', 1), 1, 0);
//putUnit(createUnit('unit3', 1), 2, 2);
//putUnit(createUnit('unit4', 0), 3, 3);