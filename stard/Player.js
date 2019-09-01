class Player {
	constructor(id) {
		this.id = id
	}
	setBody(b) {
		this.body = b
		b.setOwner(this)
	}
	setController(c) {
		this.controller = {
			'pressed': false,
			'keys': {
				'up': [ c[0], false ],
				'left': [ c[1], false ],
				'down': [ c[2], false ],
				'right': [ c[3], false ]
			}
		}
	}
}