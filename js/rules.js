class Rules {
	constructor(cells, width){
		this.cells = cells;
		this.width = width;
	}

	// funkcja zwraca indeks pola w tablicy na podstawie współrzędnych x i y
	getIndex(x,y) {
		return x + y * this.width
	}

	cellIndex(x,y) {
		return this.cells[this.getIndex(x,y)];
	}

	// nadawanie elementom klasy w zależności od otrzymanego statusu
	setCellState(x,y) {
		if (this.cellIndex(x,y).classList.contains('life')) {
			this.cellIndex(x,y).classList.remove('life');
		} else {
			this.cellIndex(x,y).classList.add('life');
		}
	}

	// funkcja służąca do zdalnego ustawiania pierwszych pól
	firstGlider() {
		setCellState(x, y, 'life')
	}

	// określanie kolejnego stanu pola na podstawie stanu sąsiada
	computeCellNextState(x, y) {

		// counter sprawdza ile sąsiadów pola posiada klasę 'life'
		let counter = 0;
		if (this.cellIndex(x-1,y-1) && this.cellIndex(x-1,y-1).classList.contains('life')) {
			counter += 1;
		}
		if (this.cellIndex(x,y-1) && this.cellIndex(x,y-1).classList.contains('life')) {
			counter += 1;
		}
		if (this.cellIndex(x+1,y-1) && this.cellIndex(x+1,y-1).classList.contains('life')) {
			counter += 1;
		}
		if (this.cellIndex(x-1,y) && this.cellIndex(x-1,y).classList.contains('life')) {
			counter += 1;
		}
		if (this.cellIndex(x+1,y) && this.cellIndex(x+1,y).classList.contains('life')) {
			counter += 1;
		}
		if (this.cellIndex(x-1,y+1) && this.cellIndex(x-1,y+1).classList.contains('life')) {
			counter += 1;
		}
		if (this.cellIndex(x,y+1) && this.cellIndex(x,y+1).classList.contains('life')) {
			counter += 1;
		}
		if (this.cellIndex(x+1,y+1) && this.cellIndex(x+1,y+1).classList.contains('life')) {
			counter += 1;
		}

		// w zależności od countera określany jest kolejny stan pola. Jeżeli pole ma żyć to funkcja zwraca 1, a jeżeli ma umrzeć to 0
		if(this.cellIndex(x, y).classList.contains('life') && counter < 2) { 
			return 0;
		} else if ((this.cellIndex(x, y).classList.contains('life')) && (counter === 2 || counter === 3)) {
			return 1;
		} else if (this.cellIndex(x, y).classList.contains('life') && counter > 3) {
			return 0;
		} else if (!(this.cellIndex(x, y).classList.contains('life')) && counter ===  3) {
			return 1;
		} 
		return 0;
	}
};

module.exports =  Rules;