class GameModel {
   // default game states
    constructor () {
        this.game = [
            [0,0,0],
            [0,0,0],
            [0,0,0]
        ];     
        this.playerOneTurn = true;
        this.gameOver = false;
    }
    // changes the boardtile clicked
    changeTile(x,y,player) {
        // debugger;
        let targDiv = document.getElementById(`tile${x}${y}`)
        if (player === true && this.game[x][y] === 0){
            this.game[x][y] = 1;
            targDiv.dataset.boardStatus = '1';
        } else if (player === false && this.game[x][y] === 0) {
            this.game[x][y] = 2;
            targDiv.dataset.boardStatus = '2';
        }
        return this.game;
    }
    // checks player turn and returns it and changes player turn
    returnTurn() {
        if (this.playerOneTurn === true){
            this.playerOneTurn = false;
            return !this.playerOneTurn;
        } else {
            this.playerOneTurn = true;
            return !this.playerOneTurn;
        }
    }
    getGameOver(){
        return this.gameOver;
    }
    getBoard() {
        return this.game;
    }
    checkWin(plyr) {
        if ((this.game[0][0] === plyr && this.game[0][1] === plyr && this.game[0][2] === plyr) ||
            (this.game[1][0] === plyr && this.game[1][1] === plyr && this.game[1][2] === plyr) ||
            (this.game[2][0] === plyr && this.game[2][1] === plyr && this.game[2][2] === plyr) ||
            (this.game[0][0] === plyr && this.game[1][0] === plyr && this.game[2][0] === plyr) ||
            (this.game[0][1] === plyr && this.game[1][1] === plyr && this.game[2][1] === plyr) ||
            (this.game[0][2] === plyr && this.game[1][2] === plyr && this.game[2][2] === plyr) ||
            (this.game[0][0] === plyr && this.game[1][1] === plyr && this.game[2][2] === plyr) ||
            (this.game[0][2] === plyr && this.game[1][1] === plyr && this.game[2][0] === plyr)
           ) { this.gameOver = true;
               return this.gameOver;
             } else {
               return this.gameOver;
             }
        }
    }
class View {
    constructor(rootEl,playerClick,getBoardStatus,playerTurn,returnWinner,theEnd) {
        this.rootEl = rootEl;
        this.playerClick = playerClick;
        this.getBoardStatus = getBoardStatus;
        this.playerTurn = playerTurn;
        this.whoWon = returnWinner;
        this.status = this.getBoardStatus();
        this.boardFill = 0;
        this.gameEnd = theEnd;
    }
    // creates the divs on the center gameboard div and styles them
    populateGameBoard (gameState) {
        this.status = gameState;
        for ( let x = 0; x < 3; x += 1) {
            for ( let y = 0; y < 3; y += 1){
                let newTile = document.createElement('div');
                newTile.classList.add('boardTile');
                newTile.id= `tile${x}${y}`;
                newTile.style.display= `grid-column:${x+1}; grid-row:${y+1};`;
                newTile.style.borderRadius = '100px';
                newTile.style.backgroundColor = 'white';
                newTile.dataset.boardStatus = `${this.status[x][y]}`;
                rootEl.appendChild(newTile);
            }
        }
    }
    // adds the event listener and checks for win/game over every turn
    clickClick(){
        let cont = document.querySelector("#gameBoard");
            cont.addEventListener("click", doSomething.bind(this), false);
            function doSomething(e) {
                let clickedItem = e.target.id;
                let passedX = clickedItem.slice(4,5);
                let passedY = clickedItem.slice(5,6);
                if (e.target.dataset.boardStatus === '0'){
                    this.updateBoard(playerClick(passedX,passedY,this.playerTurn()));
                    this.boardFill += 1;
                }
                this.alertWinner();
                // player notifications
                this.playerTurnNotification(this.boardFill);
            }
        }
    // more robust winner notification rather than the window alert
    alertWinner(){
        if (this.whoWon(1) === true) {
            document.querySelector('#gameMessage').innerText = 'Player X Wins! Click here for new Game!';
            document.querySelector('#mainFooter').addEventListener('click', this.resetBoard);
            this.winBoard(1);
        } else if (this.whoWon(2) === true){
            document.querySelector('#gameMessage').innerText = 'Player O Wins! Click here for new Game!';
            document.querySelector('#mainFooter').addEventListener('click', this.resetBoard);
            this.winBoard(2);
        } else if (this.boardFill === 9) {
            document.querySelector('#gameMessage').innerText = `It's a tie! Click here for new Game!`;
            document.querySelector('#mainFooter').addEventListener('click', this.resetBoard);
        }
    }
    resetBoard() {
        location.reload(true);
    }
    //displays a winning board preventing further moves
    winBoard(winner) {
        for ( let x = 0; x < 3; x += 1) {
            for ( let y = 0; y < 3; y += 1){
                let tileFlip = document.querySelector(`#tile${x}${y}`);
                tileFlip.dataset.boardStatus = winner;
                this.status[x][y] = winner;
            }
        }
        this.updateBoard(this.status);
    }
    playerTurnNotification(turnNumber){
        if (turnNumber % 2 === 0) {
            document.querySelector('#player1').style.backgroundColor = 'dodgerblue';
            document.querySelector('#player2').style.backgroundColor = 'white';
        } else {
            document.querySelector('#player2').style.backgroundColor = 'dodgerblue';
            document.querySelector('#player1').style.backgroundColor = 'white';
        }
    }
    // updates the board when called parameter is a game state
    updateBoard(gameState){
        this.status = gameState;
        for ( let x = 0; x < 3; x += 1) {
            for ( let y = 0; y < 3; y += 1){
                let tileFlip = document.querySelector(`#tile${x}${y}`);
                tileFlip.dataset.boardStatus = `${this.status[x][y]}`;
                if( tileFlip.dataset.boardStatus ===  '0' ) {
                } else if ( tileFlip.dataset.boardStatus ===  '1' ) {
                    tileFlip.style.background = `url('./assets/x.png')`;
                } else if (tileFlip.dataset.boardStatus ===  '2') {
                    tileFlip.style.background = `url('./assets/o.png')`;
                }
                tileFlip.style.backgroundSize = 'cover';
            }
        }
    } 
    //renders
    render() {
        this.populateGameBoard(this.getBoardStatus());
        this.clickClick();
    }
}
const rootEl = document.querySelector('#gameBoard');
const gameModel = new GameModel();
const getBoardStatus = gameModel.getBoard.bind(gameModel);
const playerClick = gameModel.changeTile.bind(gameModel);
const playerTurn = gameModel.returnTurn.bind(gameModel);
const returnWinner = gameModel.checkWin.bind(gameModel);
const theEnd = gameModel.getGameOver.bind(gameModel);
const view = new View(rootEl, playerClick, getBoardStatus, playerTurn,returnWinner,theEnd);
view.render();