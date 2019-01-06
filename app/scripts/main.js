let magicGrid;
window.onload = () => {
    magicGrid = new MagicGrid(document.getElementById('container'));
    const messagesContainer = document.getElementById('message-overlay');
    startMessaging(messagesContainer);
};

const messages = [
    'Hi,',
    `This is my website`,
    'What is essential, is invisible to the eye'
]

const startMessaging = (container) => {
    _showMessages(container, messages[messages.indexOf(container.textContent) + 1]);
    const messageTimer = setInterval(() => {
        if(container.classList.contains('hide-message'))
        {
            if(messages.indexOf(container.textContent) + 1  === messages.length){
                clearInterval(messageTimer);
                _showLinks(container);
            } else _showMessages(container,messages[messages.indexOf(container.textContent) + 1]);
            container.classList.remove('hide-message');
        }
        else container.classList.add('hide-message');
    }, 1000 )
}
const _showMessages = (container, message) => {
    container.textContent = message;
}
const _showLinks = (container) => {
    const linksDiv = document.createElement('div');
    linksDiv.innerHTML = `<a href="https://github.com/scotch83" target="_blank">Mattia Collalti - Software developer</a>`;
    container.textContent = "";
    container.style.zIndex = magicGrid.zIndex + 1;
    container.appendChild(linksDiv);
}
const MagicGrid =  function (container) {
    this.wClicked = false;
    this.zIndex = 0;
    this.squaresPerRow = 50;
    this.squares = [];
    this.disableAnimation = false;
    this.generateSquares(container);
}

MagicGrid.prototype.showAllSquares = function () {
    for(let i = 0; i < this.squares.length; i++) {
        const square = this.squares[i];
        square.style.opacity = 1;
        square.style.zIndex = 0;
    }
}

MagicGrid.prototype.generateSquares =  function (container) {

    const sqWidth = window.innerWidth / this.squaresPerRow;
    const numRows = Math.floor(window.innerHeight / sqWidth) + 1;
    for (let j = 0; j < numRows; j++) {
        const row = document.createElement('div');
        row.classList.add('row');
        for (let i = 0; i < this.squaresPerRow; i++) {
            row.appendChild(this.getSquare());
        }
        container.appendChild(row)
    }
}

MagicGrid.prototype.getSquare = function () {

    const color = this.getRandomColor();

    const square = document.createElement('div');
    this.squares.push(square);
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
    if(this.disableAnimation) return;
    e.preventDefault();
    square.classList.remove('squareAnimated');
}

MagicGrid.prototype.animateSquareEvent = function (e, square) {
    if(this.disableAnimation) return;
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
