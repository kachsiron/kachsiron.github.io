class Cell {
	constructor(x, y) {
		this.name = 'cell';
		this.position = { 'x': x, 'y': y };
		this.type = null;
		this.unit = null;
		this.seed = null;
		this.div = document.createElement('DIV');
		this.div.className = 'cell';
		this.imgs = { 'soil': document.createElement('IMG'), 'plant': document.createElement('IMG') };
		this.imgs.plant.style.display = 'none'
		for (let i in this.imgs) this.div.appendChild(this.imgs[i]);

	}
	setPlod(value) {
		if (value < 0) value = 0;
		else if (value > 1) value = 1;
		this.plod = value;
		if (value > 0.8) this.imgs.soil.src = 'img/Soil_5_0'+rand(1, 3)+'.png';
		else if (value > 0.6) this.imgs.soil.src = 'img/Soil_4_0'+rand(1, 3)+'.png';
		else if (value > 0.4) this.imgs.soil.src = 'img/Soil_3_0'+rand(1, 3)+'.png';
		else if (value > 0.2) this.imgs.soil.src = 'img/Soil_2_0'+rand(1, 3)+'.png';
		else this.imgs.soil.src = 'img/Soil_1_0'+rand(1, 3)+'.png';

	}
	convert(type) {
		this.type = type;
		if (type === 'soil') {
			//this.imgs.grass.src = 'img/grass.png';
		}
	}
	toSeed(s) {
		this.seed = s;
		this.imgs.plant.style.display = '';
		this.imgs.plant.src = 'img/Grass_5_0'+rand(1, 3)+'.png';
	}
	putUnit(unit) {
		this.unit = unit;
		//unit.div.style.zIndex = this.position.y;
		unit.setPosition(this.position.x, this.position.y);
	}
	removeUnit(unit) {
		if (this.unit !== null && this.unit === unit) {
			this.unit.onMap = false;
			this.unit = null
		}
	}
}
