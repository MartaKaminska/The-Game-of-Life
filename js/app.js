	
function GameOfLife(boardWidth, boardHeight) {
	this.width = boardWidth;
	this.height = boardHeight;
	this.board = document.querySelector('#board');
	this.playButton = document.querySelector('#play');
	this.pauseButton = document.querySelector('#pause')
	this.cells = [];
	
	const _this = this;

	// tworzenie planszy z polami w zależności od podanych wymiarów: boardWidth, boardHeight
	function createBoard() {
		let boardWidth = _this.width * 10;
		let boardHeight = _this.height * 10;
		_this.board.style.width = `${boardWidth}px`;
		_this.board.style.height = `${boardHeight}px`;
		let numberOfCell = _this.width * _this.height;
		
		// tworzenie w dokumencie kolejnych pól oraz umieszczanie ich w tablicy _this.cells
		for(let i = 0; i < numberOfCell; i++) {
			let cell = document.createElement('div');
			_this.board.appendChild(cell);
			_this.cells.push(cell);
		}

		// nadawanie elementom klasy 'life' po najechaniu myszką
		_this.cells.forEach(element => {
			element.addEventListener('mouseover', function(){
				element.classList.toggle('life');
			}); 
		});
	}

	// funkcja zwraca indeks pola w tablicy na podstawie współrzędnych x i y
	function cellIndex(x,y) {
		const index = x + y * _this.width
		return _this.cells[index];
	}
	
	// nadawanie elementom klasy w zależności od otrzymanego statusu
	function setCellState(x,y,state) {
		if (state === 'life') {
			cellIndex(x,y).classList.add('life');
		} else {
			cellIndex(x,y).classList.remove('life');
		}
	}

	// funkcja służąca do zdalnego ustawiania pierwszych pól
	function firstGlider(x, y) {
		setCellState(x,y, 'life')
	}

	// określanie kolejnego stanu pola na podstawie stanu sąsiada
	function computeCellNextState(x,y) {

		// counter sprawdza ile sąsiadów pola posiada klasę 'life'
		let counter = 0;
		if (cellIndex(x-1,y-1) && cellIndex(x-1,y-1).classList.contains('life')) {
			counter += 1;
		}
		if (cellIndex(x,y-1) && cellIndex(x,y-1).classList.contains('life')) {
			counter += 1;
		}
		if (cellIndex(x+1,y-1) && cellIndex(x+1,y-1).classList.contains('life')) {
			counter += 1;
		}
		if (cellIndex(x-1,y) && cellIndex(x-1,y).classList.contains('life')) {
			counter += 1;
		}
		if (cellIndex(x+1,y) && cellIndex(x+1,y).classList.contains('life')) {
			counter += 1;
		}
		if (cellIndex(x-1,y+1) && cellIndex(x-1,y+1).classList.contains('life')) {
			counter += 1;
		}
		if (cellIndex(x,y+1) && cellIndex(x,y+1).classList.contains('life')) {
			counter += 1;
		}
		if (cellIndex(x+1,y+1) && cellIndex(x+1,y+1).classList.contains('life')) {
			counter += 1;
		}

		// w zależności od countera określany jest kolejny stan pola. Jeżeli pole ma żyć to funkcja zwraca 1, a jeżeli ma umrzeć to 0
		if(cellIndex(x, y).classList.contains('life') && counter < 2) { 
			return 0;
		} else if (cellIndex(x, y).classList.contains('life') && (counter === 2 || counter === 3)) {
			return 1;
		} else if (cellIndex(x, y).classList.contains('life') && counter > 3) {
			return 0;
		} else if (!(cellIndex(x, y).classList.contains('life')) && counter ===  3) {
			return 1;
		} 
		return 0;
	}

	// generowanie kolejnego stanu/wyglądu planszy
	function computeNextGeneration() {
		//towrzona jest nowa tablica z kolejnym stanem planszy
		let nextState = [];

		for(let y = 0; y <= 49; y++) {
			for(let x = 0; x <= 49; x++) {
				let element = computeCellNextState(x,y)
				nextState.push(element);
			}
		}
		return nextState
	}

	// tworzenie wioku kolejnego stanu planszy
	function printNextGeneration() {
		let newCellsList = _this.cells;
		let newGeneration = computeNextGeneration();
		
		for (let i = 0; i < newGeneration.length; i++) {
			if (newGeneration[i] === 1) {
				newCellsList[i].classList.add('life');
			} else {
				newCellsList[i].classList.remove('life');
			}
		}
	}

	createBoard();

	// tworzenie interwału po jakim pokazują się kolejne stany
	let interval = '';
	this.playButton.addEventListener('click', function() {
		interval = setInterval(printNextGeneration, 500);
		}
	);
	this.pauseButton.addEventListener('click', function() {
		clearInterval(interval);
	})
}


const game = new GameOfLife(50, 50);