import grassland_tiles from './assets/grassland_tiles.png';

const canvas = document.querySelector('canvas');
const puzzleContainer = document.querySelector('.puzzle-container');
const puzzleTarget = document.querySelector('.puzzle-target');
const puzzleImage = document.querySelector('.puzzle-source');
let puzzleTargetXY = [0, 0];
let isMouseDown = false;
let currentTarget = 0;
let layers = [
	// 底層
	{
		// schema: "canvas_x-canvas_y":["puzzle_x","puzzle_y"]
	},
	// 中層
	{},
	// 上層
	{},
];
const getLocalStorage = () => JSON.parse(localStorage.getItem('layers'));
const setLocalStorage = (val) => {
	localStorage.setItem('layers', JSON.stringify(val));
	layers = getLocalStorage();
};

//converts data to image:data string and pipes into new browser tab
const exportImage = () => {
	const link = document.createElement('a');
	link.download = 'obtainer-map.png';
	link.href = canvas.toDataURL();
	link.click();
};

//Reset state to empty
const clearCanvas = () => {
	setLocalStorage([{}, {}, {}]);
	draw();
};

const setLayer = (newLayer, oldLayer) => {
	if (oldLayer) {
		oldLayer.classList.remove('active');
	}
	currentTarget = +newLayer.dataset.layer;
	newLayer.classList.add('active');
};

//Utility for getting coordinates of mouse click
const getCoords = (e) => {
	const { x, y } = e.target.getBoundingClientRect();
	const mouseX = e.clientX - x;
	const mouseY = e.clientY - y;
	return [Math.floor(mouseX / 16), Math.floor(mouseY / 16)];
};

const draw = () => {
	const ctx = canvas.getContext('2d');
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	const size_of_crop = 16;

	layers.forEach((layer) => {
		Object.keys(layer).forEach((key) => {
			//Determine x/y position of this placement from key ("3-4" -> x=3, y=4)
			const positionX = Number(key.split('-')[0]);
			const positionY = Number(key.split('-')[1]);
			let [puzzleX, puzzleY] = layer[key];

			ctx.drawImage(
				puzzleImage,
				puzzleX * size_of_crop,
				puzzleY * size_of_crop,
				size_of_crop,
				size_of_crop,
				positionX * size_of_crop,
				positionY * size_of_crop,
				size_of_crop,
				size_of_crop,
			);
		});
	});
};

//Handler for placing new tiles on the map
const addTile = (mouseEvent) => {
	var clicked = getCoords(mouseEvent);
	const key = clicked[0] + '-' + clicked[1];
	if (mouseEvent.shiftKey) {
		delete layers[currentTarget][key];
	} else {
		layers[currentTarget][key] = [puzzleTargetXY[0], puzzleTargetXY[1]];
	}

	setLocalStorage(layers);
	draw();
};

//Bind mouse events for painting (or removing) tiles on click/drag
canvas.addEventListener('mousedown', () => {
	isMouseDown = true;
});
canvas.addEventListener('mouseup', () => {
	isMouseDown = false;
});
canvas.addEventListener('mouseleave', () => {
	isMouseDown = false;
});
canvas.addEventListener('mousedown', addTile);
canvas.addEventListener('mousemove', (event) => {
	if (isMouseDown) {
		addTile(event);
	}
});

//Select tile from the Tiles grid
puzzleContainer.addEventListener('mousedown', (event) => {
	puzzleTargetXY = getCoords(event);

	puzzleTarget.style.width = 16 + 'px';
	puzzleTarget.style.height = 16 + 'px';
	puzzleTarget.style.left = puzzleTargetXY[0] * 16 + 'px';
	puzzleTarget.style.top = puzzleTargetXY[1] * 16 + 'px';
});

document
	.querySelectorAll('.controller__layer button')
	.forEach((layer, idx, layers) => {
		layer.addEventListener('click', (event) => {
			let oldLayer = [...layers].find((i) => i.className.includes('active'));
			setLayer(event.target, oldLayer);
		});
	});

document
	.querySelector('.controller__buttons>button:nth-child(1)')
	.addEventListener('click', clearCanvas);

document
	.querySelector('.controller__buttons>button:nth-child(2)')
	.addEventListener('click', exportImage);

puzzleImage.onload = function () {
	if (!getLocalStorage) {
		setLocalStorage([{}, {}, {}]);
	} else {
		layers = getLocalStorage();
	}
	draw();
};
const currentImage = grassland_tiles;

puzzleImage.src = currentImage;
puzzleImage.setAttribute('crossOrigin', 'Anonymous');
