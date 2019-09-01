class Mapp {
	constructor(width, height) {
		this.divs = {
			'main': document.createElement('DIV'),
			//'cursor': document.createElement('DIV'),
			'units': document.createElement('DIV'),
			'cells': document.createElement('DIV')
		};
		this.divs.main.className = 'canvas';
		this.divs.cells.className = 'cells_div';
		//this.divs.cursor.className = 'cursor_div';
		this.divs.units.className = 'units_div';
		this.divs.main.appendChild(this.divs.cells)
		this.divs.main.appendChild(this.divs.units)
		//this.divs.main.appendChild(this.divs.cursor)
	}
	makeNewCells() {
		this.cells = []
		for (let y = 0; y < this.size.height; y++) {
			this.cells[y] = []
			for (let x = 0; x < this.size.width; x++) {
				this.cells[y][x] = new Cell(x, y);
				this.divs.cells.appendChild(this.cells[y][x].div)
			}
		}
	}
	makeCell(type, x, y) {
		this.cells[y][x].convert(type);
		return this.cells[y][x]
	}
	mislaid(x, y) {
		if (x < 0 || y < 0 || x >= this.size.width || y >= this.size.height) return true;
		return false
	}
	getCell(x, y) {
		//if (this.mislaid(x, y)) return null;
		return this.cells[y][x]
	}
	setSize(w, h) {
		this.size = { 'width': w, 'height': h }; // кол-во клеток
		this.makeNewCells()
	}
}