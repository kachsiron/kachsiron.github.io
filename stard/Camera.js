class Camera {
	constructor(div, mp, ws) {
		this.mapDiv = div;
		this.map = mp
		this.windowSize = ws;
		this.divPosition = { 'x': 0, 'y': 0 };
	}
	moveOnCell(pos) {
		this.moveOn(pos.x * this.cellSize.width, pos.y * this.cellSize.height)
	}
	moveOn(x, y) {
		this.divPosition.x = this.windowSize.width / 2 - x;
		if (this.divPosition.x - this.windowSize.padding.left > 0) this.divPosition.x = this.windowSize.padding.left;
		else if (this.divPosition.x + this.width < this.windowSize.width) this.divPosition.x = -(this.width - this.windowSize.width + this.windowSize.padding.left);

		this.divPosition.y = this.windowSize.height / 2 - y;
		if (this.divPosition.y - this.cellSize.unitShift > 0) this.divPosition.y = this.cellSize.unitShift;
		else if (this.divPosition.y + this.height + this.windowSize.padding.bottom < this.windowSize.height) this.divPosition.y = -(this.height - this.windowSize.height + this.windowSize.padding.bottom);
		
		this.mapDiv.style.left = this.divPosition.x + 'px';
		this.mapDiv.style.top = this.divPosition.y + 'px';
	}
	setCellShift(s) { this.cellSize.cellShift = s }
	setUnitShift(s) { this.cellSize.unitShift = s }
	setCellCenter(x, y) {
		this.cellSize.center = { 'x': x, 'y': y }
	}
	setCellSize(w, h) {
		this.cellSize = { 'width': w, 'height': h }
		this.width = this.map.size.width * w;
		this.height = this.map.size.height * h;
		
		for (let i in this.map.divs) {
			this.map.divs[i].style.width = (this.map.size.width * this.cellSize.width) + 'px';
			this.map.divs[i].style.height = (this.map.size.height * this.cellSize.height) + 'px';
		}
	}
	getUnitRealPosition(x, y) {
		return [this.cellSize.width * x, this.cellSize.height * y]
	}
	refresh(c) {
		c.div.style.left = (this.cellSize.width * c.position.x) + 'px';
		c.div.style.top = (this.cellSize.height * c.position.y) + 'px';
		let w = this.cellSize.width + 'px';
		let h = this.cellSize.height + (c.name === 'unit' ? this.cellSize.unitShift : this.cellSize.cellShift) + 'px';
		c.div.style.width = w;

		c.div.style.height = this.cellSize.height;
		for (let i in c.imgs) {
			c.imgs[i].style.width = w;
			c.imgs[i].style.height = h;
		}
		if (c.name === 'unit') {
			c.imgs.face.style.bottom = '16px';
		}
		if (c.name === 'cell') {
			c.imgs.plant.style.bottom = '16px';
			c.imgs.soil.style.height = this.cellSize.height;
			c.imgs.plant.style.height = h;
		}
	}
}