
window.onload = () => {
    new MagicGrid(document.getElementById('container'));
    startMessaging();
};

const messages = [
    'This is my website',
    'Feel free to click around'
]

const startMessaging = () => {
    setInterval(() => {
        const messageBox = document.getElementById('message-overlay');
        if(messageBox.classList.contains('hide-message'))
        {
            _showMessages(messageBox)
            messageBox.classList.remove('hide-message');
        }
        else messageBox.classList.add('hide-message');
    }, 1000 )
}
let index = 0;
const _showMessages = (container) => {
    container.textContent = messages[index%messages.length];
    index++;
}
const MagicGrid = function (container) {
    this.wClicked = false;
    this.zIndex = 0;
    this.numSquares = 50;
    this._container
    this.generateSquares(container);
}

MagicGrid.prototype.generateSquares = function (container) {

    const sqWidth = window.innerWidth / this.numSquares;
    const numRows = Math.floor(window.innerHeight / sqWidth) + 1;
    for (let j = 0; j < numRows; j++) {
        const row = document.createElement('div');
        row.classList.add('row');
        for (let i = 0; i < this.numSquares; i++) {
            row.appendChild(this.getSquare())
        }
        container.appendChild(row)
    }
}

MagicGrid.prototype.getSquare = function () {

    const color = this.getRandomColor();

    const square = document.createElement('div');
    square.classList.add('square');
    square.style.backgroundColor = color;

    const squareContainer = document.createElement('div');
    squareContainer.onmouseenter = (e) => {
        if (!this.wClicked) return;
        this.animateSquareEvent(e, square);
    }
    squareContainer.onmouseleave = (e) => {
        if (!this.wClicked) return;
        this.removeAnimationEvent(e, square);
    }
    squareContainer.onmousedown = (e) => {
        if (!this.wClicked) this.wClicked = true;
        this.animateSquareEvent(e, square);
    }
    squareContainer.onmouseup = (e) => {
        if (this.wClicked) this.wClicked = false;
        this.removeAnimationEvent(e, square);
    }

    squareContainer.classList.add('squareContainer');
    squareContainer.appendChild(square);

    return squareContainer;
}

MagicGrid.prototype.removeAnimationEvent = function (e, square) {
    e.preventDefault();
    square.classList.remove('squareAnimated');
}

MagicGrid.prototype.animateSquareEvent = function (e, square) {
    e.preventDefault();
    square.style.zIndex = ++this.zIndex;
    square.classList.add('squareAnimated');
}

MagicGrid.prototype.getRandomColor = function () {
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
