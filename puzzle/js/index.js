/** Options **/
var OPT = {
    row: 10,
    col: 7,
	borderColor: '#fff',
	start: 0
};

var URLS = [
	'./img/movie1.jpg',
	'./img/movie2.jpg',
	'./img/movie3.jpg'
];

/** shuffle array **/
Array.prototype.shuffle = function() {
    var i = this.length, j, temp;
    if ( i === 0 ) return this;
    while ( --i ) {
        j = Math.floor( Math.random() * ( i + 1 ) );
        temp = this[i];
        this[i] = this[j];
        this[j] = temp;
    }
    return this;
};

var UI = {
	preserve: document.getElementById('preserve'),
	puzzle: document.getElementById('puzzle')
};

var GLOBAL = {
	index: OPT.start,
	size: {}
};

$(document).ready(function() {

	var url = URLS[GLOBAL.index];

	UI.preserve.onload = function() {
        calcSize(UI.preserve, OPT.row, OPT.col);

        initUI();

        applyStyle(GLOBAL.size);

        applyImg(UI.preserve.src);
	};

	UI.preserve.src = url;
});

$(window).on('resize scroll', function() {

	calcSize(UI.preserve, OPT.row, OPT.col);

	applyStyle(GLOBAL.size);

	applyImg(UI.preserve.src);

});

/* calculate size */
function calcSize(img, row, col) {
	var style = window.getComputedStyle(img);

	var puzzleWidth = Math.floor(toNumber(style.width) / col),
		puzzleHeight = Math.floor(toNumber(style.height) / row);

	GLOBAL.size = {
		width: puzzleWidth * col,
		height: puzzleHeight * row,
		puzzle: {
			width: puzzleWidth,
			height: puzzleHeight
		}
	};

	function toNumber(px) {
		var value = Number(px.substring(0, px.indexOf('p')));
		return Math.floor(value);
	}
}

/* initUI */
function initUI() {

	var $puzzle = $(UI.puzzle).empty(),
		pieces = [];

	for (var i = 0; i < OPT.row; ++i) {
		for (var j = 0; j < OPT.col; ++j) {
            var $piece = $('<div class="puzzle" data-row="' + i + '" data-col="' + j + '"></div>');
            pieces.push($piece);
		}
	}

	UI.pieces = pieces.shuffle();

	UI.pieces.forEach(function($piece) {
		$puzzle.append($piece);
	});

}

function applyStyle(size) {

	var $puzzle = $(UI.puzzle),
		$preserve = $(UI.preserve);

    $preserve.css('opacity', 0);

    $puzzle.css({
        width: size.width,
        height: size.height,
        borderColor: OPT.borderColor
    });

    UI.pieces.forEach(function($piece) {
        $piece.css({
            width: size.puzzle.width,
            height: size.puzzle.height
        });
	})
}

/* apply Image */
function applyImg(imgSrc) {

	var $pieces = UI.pieces;
	var size = GLOBAL.size;

	$pieces.forEach(function($piece) {
		$piece.css({
			backgroundImage: 'url(' + imgSrc + ')',
			backgroundPosition: getBgPosition($piece.attr('data-row'), $piece.attr('data-col')),
			backgroundSize: size.width + 'px ' + size.height + 'px'
		});
	});

	function getBgPosition(row, col) {
		var pos_x = -col * size.puzzle.width + 'px',
			pos_y = -row * size.puzzle.height + 'px';

		return pos_x + ' ' + pos_y;
	}

}

/** paging **/
$('#btn_prev').click(function(e) {
	e.preventDefault();
	GLOBAL.index = --GLOBAL.index < 0 ? URLS.length - 1 : GLOBAL.index;
	UI.preserve.src = URLS[GLOBAL.index];
});

$('#btn_next').click(function(e) {
    e.preventDefault();
    GLOBAL.index = ++GLOBAL.index >= URLS.length ? 0 : GLOBAL.index;
    UI.preserve.src = URLS[GLOBAL.index];
});