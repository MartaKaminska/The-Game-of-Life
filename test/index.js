const {JSDOM} = require('jsdom');

//tworzenie DOM do testów
function Dom() {
	const dom = new JSDOM("<!doctype html><html><body><div id='board'>Board</div><button id='play'>Play</button><button id='pause'>Pause</button></body></html>", {
		pretendToBeVisual: true,
	});
	
	global.Node = dom.window.Node;
	global.Event = dom.window.Event;
	global.window = dom.window;
	global.document = dom.window.document;
	global.requestAnimationFrame = dom.window.requestAnimationFrame;
}

module.exports = Dom;