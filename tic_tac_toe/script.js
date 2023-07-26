const tiles= Array.from(document.querySelectorAll('.tile'));
const playerDisplay= document.querySelector('.display-player');
const resetButton=document.querySelector('#reset');
const announcer=document.querySelector('.announcer');

let board= ['','','','','','','','',''];
let currentPlayer= 'X';
let isGameActive=true;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleResultValidation(){
    let roundWon=false;
    for(let i=0;i<=7;i++){
        const wincondition= winningConditions[i];
        const a= board[wincondition[0]];
        const b= board[wincondition[1]];
        const c= board[wincondition[2]];

        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break;
        }
    }

    if(roundWon){
        announce(currentPlayer==='X'?'X_won':'O_won');
        isGameActive=false;
        return;
    }

    if(!board.includes('')){
        announce('tie');
    }
}

function announce(type){
    switch(type){
        case 'X_won':
            announcer.innerHTML='Player <span class="playerX">X</span> Won';
            break;
        case 'O_won':
            announcer.innerHTML='Player <span class="playerO">O</span> Won';
            break;
        case 'tie':
            announcer.innerText='Tie'
    }
    announcer.classList.remove('hide');
}

function isValidAction(tile){
    if(tile.innerText==='X' || tile.innerText==='O'){
        return false;
    }
    return true
}

function updateBoard(index){
    board[index]=currentPlayer;

}

const changePlayer = () => {
    playerDisplay.classList.remove(`player${currentPlayer}`);
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    playerDisplay.innerText = currentPlayer;
    playerDisplay.classList.add(`player${currentPlayer}`);
}

const resetBoard = () => {
    board = ['', '', '', '', '', '', '', '', ''];
    isGameActive = true;
    announcer.classList.add('hide');

    if (currentPlayer === 'O') {
        changePlayer();
    }

    tiles.forEach(tile => {
        tile.innerText = '';
        tile.classList.remove('playerX');
        tile.classList.remove('playerO');
    });
}

function userAction(tile,index){
    if(isGameActive && isValidAction(tile)){
        tile.innerText=currentPlayer;
        tile.classList.add(`player${currentPlayer}`);
        updateBoard(index);
        handleResultValidation();
        changePlayer();
    }
}
tiles.forEach((tile,index)=>{
    tile.addEventListener('click',()=>userAction(tile,index));
    
})

resetButton.addEventListener('click',resetBoard);