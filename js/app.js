const Rules = require ('./rules');

class GameOfLife {
		constructor(boardWidth, boardHeight) {
			this.width = boardWidth;
			this.height = boardHeight;
			this.board = document.querySelector('#board');
			this.playButton = document.querySelector('#play');
			this.pauseButton = document.querySelector('#pause')
			this.cells = [];
			this.interval = '';

			this.createBoard();
			this.rules = new Rules(this.cells, this.width);

			this.computeNextGeneration();
			this.changeInterval();
		}
	
	// const _this = this;

	// tworzenie planszy z polami w zależności od podanych wymiarów: boardWidth, boardHeight
	createBoard() {
		let boardWidth = this.width * 10;
		let boardHeight = this.height * 10;
		this.board.style.width = `${boardWidth}px`;
		this.board.style.height = `${boardHeight}px`;
		let numberOfCell = this.width * this.height;
		
		// tworzenie w dokumencie kolejnych pól oraz umieszczanie ich w tablicy _this.cells
		for(let i = 0; i < numberOfCell; i++) {
			let cell = document.createElement('div');
			this.board.appendChild(cell);
			this.cells.push(cell);
		}

		// nadawanie elementom klasy 'life' po najechaniu myszką
		this.cells.forEach(element => {
			element.addEventListener('mouseover', function(){
				element.classList.toggle('life');
			}); 
		});
	}



	// generowanie kolejnego stanu/wyglądu planszy
	computeNextGeneration() {
		//towrzona jest nowa tablica z kolejnym stanem planszy
		let nextState = [];

		for(let y = 0; y <= 49; y++) {
			for(let x = 0; x <= 49; x++) {
				let element = this.rules.computeCellNextState(x,y)
				nextState.push(element);
			}
		}
		return nextState
	}

	// tworzenie wioku kolejnego stanu planszy
	printNextGeneration() {
		let _this = this;
		let newCellsList = _this.cells;
		let newGeneration = _this.computeNextGeneration();
		
		for (let i = 0; i < newGeneration.length; i++) {
			if (newGeneration[i] === 1) {
				newCellsList[i].classList.add('life');
			} else {
				newCellsList[i].classList.remove('life');
			}
		}
		_this.cells = newCellsList;
	}

	// tworzenie interwału po jakim pokazują się kolejne stany
	changeInterval() {
		let _this = this;
		this.playButton.addEventListener('click', () => {
			_this.interval = setInterval((() => this.printNextGeneration()), 1000);
			}
		);
		this.pauseButton.addEventListener('click', () => {
			clearInterval(_this.interval);
		})
	}
}


const game = new GameOfLife(50, 50);
module.exports = game;