const dom = require('./index');
const assert = require('chai').assert;

dom();
const GameOfLife = require('../js/app');

describe('Game of Life - tests', () => {
	let game;
	
	//czyszczenie DOM przed kolejnym testem
	beforeEach(() => {
		dom();
		game = new GameOfLife(50,50);
	});
	
		it('Show cell index', () => {
			let cellIndex = game.rules.getIndex(1,1);
			assert.equal(cellIndex, 51);
		});

		it('Cell state', () => {
			game.rules.setCellState(1,1);
			let cellState = game.rules.cellIndex(1,1);
			assert.isTrue(cellState.classList.contains('life'));
		});

		it('Cell next state - contain class "life" and counter < 2', () => {
			game.rules.setCellState(5,1);
			game.rules.setCellState(5,2);
			let cellNextState = game.rules.computeCellNextState(5,1);
			assert.equal(cellNextState, 0);
		});

		it('Cell next state - contain class "life" and counter === 2 or counter === 3', () => {
			game.rules.setCellState(5,1);
			game.rules.setCellState(5,2)
			game.rules.setCellState(6,1);
			let cellNextState = game.rules.computeCellNextState(6,1);
			assert.equal(cellNextState, 1);
		});

		it('Cell next state - contain class "life" and counter > 3', () => {
			game.rules.setCellState(5,1);
			game.rules.setCellState(5,2);
			game.rules.setCellState(6,1);
			game.rules.setCellState(6,2);
			game.rules.setCellState(7,1);
			let cellNextState = game.rules.computeCellNextState(6,2);
			assert.equal(cellNextState, 0);
		});

		it('Cell next state - without class "life" and counter === 3', () => {
			game.rules.setCellState(5,1);
			game.rules.setCellState(6,1);
			game.rules.setCellState(7,1);
			let cellNextState = game.rules.computeCellNextState(6,0);
			assert.equal(cellNextState, 1);
		});

		it('Cell next state - other situation', () => {
			let cellNextState = game.rules.computeCellNextState(9,9);
			assert.equal(cellNextState, 0);
		});

		it('Create Board - number of cells', () => {
			let createBoard = game.cells.length;
			assert.equal(createBoard, 2500);
		})

		it('Cells - next state', () => {
			let createNextState = game.computeNextGeneration();
			assert.isArray(createNextState);
		})

		it('Compare first state and next state', () => {
			let createBoard = game.cells
			let createNextState = game.computeNextGeneration();
			assert.notEqual(createBoard, createNextState);
		})
});

