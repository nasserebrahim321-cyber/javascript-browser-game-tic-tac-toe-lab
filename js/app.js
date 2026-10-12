/*-------------------------------- Constants --------------------------------*/
const messageEl = document.querySelector('#message');
const squareEls = document.querySelectorAll('.sqr');
const resetBtn = document.querySelector('#reset');

//wining combos 
const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, '', ''],
    ['', 1, ''],
    ['', '', 2],
    ['', '', 0],
    ['', 1, ''],
    [2, '', ''],
]
/*---------------------------- Variables (state) ----------------------------*/
let board = ['', '', '', '', '', '', '', '', '']
let turn = 'X'
let winner = false
let tie = false


/*------------------------ Cached Element References ------------------------*/
console.log(messageEl)
console.log(squareEls)
console.log(resetBtn)

/*-------------------------------- Functions --------------------------------*/

function init() {
    board = ['', '', '', '', '', '', '', '', '']
    turn = 'X'
    winner = false
    tie = false
    console.log('this is init function')
    render()
    updateUiBoard()
    checkForWinner()

}

function render() {
    console.log('this is render function')
    updateBoard()
    updateMessage()

}

//please ignore this function
function updateBoard() {

    // for (i = 0; i < board.length; i++) {
    //     if (squareEls[i].textContent === 'X') {
    //         squareEls[i].classList.toggle('x-state')
    //     }
    //     else if (squareEls[i].textContent === 'O') {
    //         squareEls[i].classList.toggle('o-state')
    //     }
    //     else {
    //         squareEls[i].classList.toggle('empty-state')
    //     }
    // }
}

function updateMessage() {
    if (!winner && !tie) {
        if (turn === 'X') {
            messageEl.textContent = 'Your Turn'
        }
        else {
            messageEl.textContent = 'Opponent Turn'
        }
    }
    else if (!winner && tie) {
        messageEl.textContent = 'TIE'
    }
    else {
        messageEl.textContent = 'CONGRATULATIONS YOU ARE THE WINNER !!!'
    }
}

function placePiece(index) {
    board[index] = turn
}

function checkForWinner() {

    for (let i = 0; i < winningCombos.length; i++) {
        let [a, b, c] = winningCombos[i]
        if (board[a] !== '' && board[a] === board[b] && board[a] === board[c]) {
            winner = true
            messageEl.textContent = `We Have A Winner player : ${turn}`
        }
    }
}

function checkForTie() {
    if (winner) {
        return
    }

    if (!board.includes('')) {
        tie = true
    }

}

function switchPlayerTurn() {
    if (winner === true) {
        return
    }

    if (turn === 'X') {
        turn = 'O'
    }
    else {
        turn = 'X'

    }
}

function updateUiBoard() {
    for (i = 0; i < board.length; i++) {
        squareEls[i].textContent = board[i]
    }
}

function handleClick(event) {
    console.log(event.target.id)
    let squareIndex = event.target.id

    if (board[squareIndex] === 'X' || board[squareIndex] === 'O' || winner) {
        // console.log(board[squareIndex])
        return;
    }

    placePiece(squareIndex)
    checkForWinner();
    checkForTie();
    switchPlayerTurn();
    updateMessage();
    updateUiBoard();
}
/*----------------------------- Event Listeners -----------------------------*/

squareEls.forEach((element) => {
    element.addEventListener('click', handleClick)
})

resetBtn.addEventListener('click', init)