// import { View } from './view.js';
// import { GameModel } from './model.js';

class GameModel {
    constructor () {
        this.game = [
            [1,2,0],
            [0,0,0],
            [0,0,0]
        ];     
        this.playerOneTurn = true;
    }
    changeTile(x,y,player) {
        debugger;
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
    returnTurn() {
        return this.playerOneTurn;
    }
    getBoard() {
        return this.game;
    }
}



class View {
    constructor(rootEl,playerClick,getBoardStatus,playerTurn) {
        this.rootEl = rootEl;
        this.playerClick = playerClick;
        this.getBoardStatus = getBoardStatus;
        this.playerTurn = playerTurn;
        this.status = this.getBoardStatus();
    }
    populateGameBoard (gameState) {
        this.status = gameState;
        for ( let x = 0; x < 3; x += 1) {
            for ( let y = 0; y < 3; y += 1){
                let newTile = document.createElement('div');
                newTile.classList.add('boardTile');
                newTile.id= `tile${x}${y}`;
                newTile.style.display= `grid-column:${x+1}; grid-row:${y+1};`;
                newTile.dataset.boardStatus = `${this.status[x][y]}`;
                newTile.innerText = `${this.status[x][y]}`;
                rootEl.appendChild(newTile);
            }
        }

    }
    clickClick(){
        let cont = document.querySelector("#gameBoard");
            cont.addEventListener("click", doSomething, false);
 
            function doSomething(e) {
                let clickedItem = e.target.id;
                let passedX = clickedItem.slice(5);
                let passedY = clickedItem.slice(5);
                // console.log(this.playerTurn());
                view.updateBoard(this.getBoardStatus);
                // e.target.style.backgroundColor = 'red';
                // window.alert("Hello " + passedX + passedY);    
                // console.log('yolo');
                
        }
    }
    updateBoard(gameState){
        this.status = gameState;
        for ( let x = 0; x < 3; x += 1) {
            for ( let y = 0; y < 3; y += 1){
                let tileFlip = document.querySelector(`#tile${x}${y}`);
                tileFlip.dataset.boardStatus = `${this.status[x][y]}`;
                if( tileFlip.dataset.boardStatus ===  '0' ) {
                    tileFlip.style.background = 'none';
                } else if ( tileFlip.dataset.boardStatus ===  '1' ) {
                    tileFlip.style.background = `url('../freestyle-ttt/assets/x.png')`;
                } else if (tileFlip.dataset.boardStatus ===  '2') {
                    tileFlip.style.background = `url('../freestyle-ttt/assets/o.png')`;
                }
                tileFlip.style.backgroundSize = 'cover';
            }
        }


    }
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

const view = new View(rootEl, playerClick, getBoardStatus, playerTurn);
view.populateGameBoard(gameModel.getBoard());
view.updateBoard(gameModel.getBoard());
// view.clickClick();
// view.render();