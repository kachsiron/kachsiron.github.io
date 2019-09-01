class Unit {
	constructor() {
		this.name = 'unit';
		this.position = { 'x': 0, 'y': 0 }
		this.realPosition = { 'x': 0, 'y': 0 }
		this.onMap = false;
		this.div = document.createElement('DIV');
		this.div.className = 'unit';
		this.imgs = { 'face': document.createElement('DIV') };
		this.imgs.face.className = 'anim';
		this.div.appendChild(this.imgs.face);
		this.par = {};
		this.anims = {};
		this.direction = 2;
		this.directionWord = [ 'up', 'right', 'down', 'left' ];
		this.moveInterval = null
		this.animInterval = null
	}
	setAnim(type) {
		clearInterval(this.animInterval);
		let an;
		if (type === 'stand') an = 'stand';
		else if (type === 'walk') an = 'walk_' + this.directionWord[ this.direction ];

		let anim = this.anims[an]
		anim.frame[0] = 0;
		this.imgs.face.style.backgroundImage = 'url(' + anim.img + ')';

		this.animInterval = setInterval(() => {
			this.imgs.face.style.backgroundPosition = (-anim.frame[0] * 64) + 'px 0';
			anim.frame[0]++;
			if (anim.frame[0] >= anim.frame[1]) anim.frame[0] = 0
		}, 50);
	}
	convert(type) {
		this.type = type;
		for (let i in U[type].anim) {
			this.anims[i] = { 'img': 'img/' + type + '/' + i + '.png', 'frame': [0, U[type].anim[i].frame] }
		}
		
		this.setAnim('stand');
	}
	
	setPosition(x, y) {
		this.position.x = x;
		this.position.y = y
	}
	setRealPosition(x, y) {
		this.realPosition.x = x;
		this.realPosition.y = y;
		this.div.style.left = x + 'px';
		this.div.style.top = y + 'px'
	}
	setOwner(o) {
		this.owner = o
	}
}
var U = {
	'unit1': {
		'anim': {
			'stand': { 'frame': 18 },
			'walk_left': { 'frame': 15 },
			'walk_right': { 'frame': 15 },
			'walk_up': { 'frame': 15 },
			'walk_down': { 'frame': 15 }
		}
	}
}
