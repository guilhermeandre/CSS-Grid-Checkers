
var selected;
var openCells = [];
var activePlayer = 0;
var score = [0,0]; 
var activeAction = "select";

function isEven(n) {
  n = Number(n);
  return n === 0 || !!(n && !(n%2));
}

function Position(){
  this.x = 0;
  this.y = 0;
}

class Man {
  constructor(n, pos ) {
    this.id = n;
    this.position = new Position();
    this.position.x = pos.x;
    this.position.y = pos.y;
  }
}

function findIndex2D (array, element){
  let iMax = array.length;
  let jMax = array[0].length;

  for (let i = 0; i < iMax; i++) {
    for (let j = 0; j < jMax; j++) {

      if(board[j][i] === element){
        let pos = new Position();
        pos.x = j;
        pos.y = i;
        return pos;
      }
      
    }
  }
}

var board = [];
for (let i = 0; i < 8; i++) {
  board[i] = [];
}


for (let i = 0; i < 8; i++) {
  for (let j = 0; j < 8; j++) {
    board[j][i] = document.getElementsByClassName('man')[j+(i*8)];
  }
}

var redMen = [];

for (let i = 0; i < 3; i++) {
  for (let j = 0; j < 4; j++) {
    let startX = 0;
    let startY = i;

    if (isEven(i+1)){
      startX = (j*2);
    }

    if (!isEven(i+1)){
      startX = (j*2)+1;
    }

    // setTimeout(() => {
      board[startX][startY].classList.remove("empty");
      board[startX][startY].classList.add("red");
      redMen.push(new Man(redMen.length, { x:startX, y:startY }));
      board[startX][startY].setAttribute("id", "red-"+redMen[redMen.length-1].id );
    // }, 200*(j+(i*4)));
    
    
  }
}


var whiteMen = [];

for (let i = 0; i < 3; i++) {
  for (let j = 0; j < 4; j++) {
    let startX = 0;
    let startY = i+5;

    if (!isEven(i+1)){
      startX = (j*2);
    }

    if (isEven(i+1)){
      startX = (j*2)+1;
    }
    // setTimeout(() => {
      board[startX][startY].classList.remove("empty");
      board[startX][startY].classList.add("white");
      whiteMen.push(new Man(whiteMen.length, {x:startX, y:startY}));
      board[startX][startY].setAttribute("id", "white-"+whiteMen[whiteMen.length-1].id );
    // }, 2600+ 200*(j+(i*4)));
    
  }
}



console.log(redMen)
console.log(board)

function checkIfMovable(selectedMan){

  selectedMan.pos = findIndex2D(board,selectedMan);

  let x = selectedMan.pos.x;
  let y = selectedMan.pos.y;

  //top-left
  if ( x > 0 && y > 0){

    if ( board[x-1][y-1].classList.contains("empty") && activeAction!=="eating"){
      openCells.push(board[x-1][y-1]);
      openCells[openCells.length-1].hasEnemy = false;
    }else if(board[x-1][y-1].classList.contains(selected.enemy) && x > 1 && y >1 && board[x-2][y-2].classList.contains("empty")){
      // activeAction = "eating";
      openCells.push(board[x-2][y-2]);
      openCells[openCells.length-1].hasEnemy = true;
      openCells[openCells.length-1].fallenEnemy = board[x-1][y-1];
    }

  }

   //top-right
   if ( x < 7 && y > 0){

    if ( board[x+1][y-1].classList.contains("empty") && activeAction!=="eating"){
      openCells.push(board[x+1][y-1]);
      openCells[openCells.length-1].hasEnemy = false;
    }else if(board[x+1][y-1].classList.contains(selected.enemy) && x < 6 && y >1 && board[x+2][y-2].classList.contains("empty")){
      // activeAction = "eating";
      openCells.push(board[x+2][y-2]);
      openCells[openCells.length-1].hasEnemy = true;
      openCells[openCells.length-1].fallenEnemy = board[x+1][y-1];
    }
  }

  //bottom-right
  if ( x < 7 && y < 7 ){

    if ( board[x+1][y+1].classList.contains("empty") && activeAction!=="eating"){
      openCells.push(board[x+1][y+1]);
      openCells[openCells.length-1].hasEnemy = false;
    }else if(board[x+1][y+1].classList.contains(selected.enemy) && x < 6 && y < 6 && board[x+2][y+2].classList.contains("empty")){
      // activeAction = "eating";
      openCells.push(board[x+2][y+2]);
      openCells[openCells.length-1].hasEnemy = true;
      openCells[openCells.length-1].fallenEnemy = board[x+1][y+1];
    }

  }

   //bottom-left
  if ( x > 0 && y < 7){

    if ( board[x-1][y+1].classList.contains("empty") && activeAction!=="eating"){
      openCells.push(board[x-1][y+1]);
      openCells[openCells.length-1].hasEnemy = false;
    }else if(board[x-1][y+1].classList.contains(selected.enemy) && x > 1 && y < 6 && board[x-2][y+2].classList.contains("empty")){
      // activeAction = "eating";
      openCells.push(board[x-2][y+2]);
      openCells[openCells.length-1].hasEnemy = true;
      openCells[openCells.length-1].fallenEnemy = board[x-1][y+1];
    }

  }

  for (let i = 0; i < openCells.length; i++) {
    openCells[i].classList.add("movable");
  }

  return openCells.length;

}

function select(target){
  if(activePlayer === 0){
    target.enemy = "white";
    if(target.classList[1] != 'red'){
      return console.log("Select a RED man!")
    }
  }else{
    target.enemy="red";
    if(target.classList[1] != 'white'){
      return console.log("Select a WHITE man!")
    }
  }
  selected = target;

  if(activeAction !== "eating"){
    activeAction = "move";
  }
  console.log(activeAction);

  checkIfMovable(selected);

}

function changePlayer(){
  document.getElementById("player-"+(activePlayer+1)+"-score").classList.remove("active");  

  if(activePlayer === 0){
    activePlayer = 1;
    document.getElementById("main").style.transform = "rotateZ(0deg) perspective(30em) rotateX(30deg)";
  }else{
    activePlayer = 0;
    document.getElementById("main").style.transform = "rotateZ(180deg) perspective(30em) rotateX(-30deg)";
  }
  
  document.getElementById("player-"+(activePlayer+1)+"-score").classList.add("active");
}


function cleanMovableCells(){
  for (let i = 0; i < openCells.length; i++) {
    openCells[i].classList.remove("movable");
  }

  openCells = [];
}


function move(target) {

  target.pos =  findIndex2D(board,target);
  let x = target.pos.x;
  let y = target.pos.y;


  
  if(target.classList.contains("movable") ){
      let baseId;

      if(activePlayer === 0){
        baseId = 'red-';
        baseClass = 'red';

      }else{
        baseId = "white-";
        baseClass = 'white';
      }
      

      target.setAttribute('id', selected.id);
      target.classList.add(baseClass);
      target.classList.remove("empty");

      selected.classList.add("empty");
      selected.removeAttribute('id');
      selected.classList.remove(baseClass);

      cleanMovableCells();

      if(board[x][y].hasEnemy){
        console.log("EATING!");

        board[x][y].fallenEnemy.classList.remove(selected.enemy);
        board[x][y].fallenEnemy.removeAttribute("id");
        board[x][y].fallenEnemy.classList.add("empty");
        score[activePlayer]++;
        document.getElementById("player-"+(activePlayer+1)+"-score").innerText = score[activePlayer];
        

        activeAction="eating";
        
        let plusMoves = checkIfMovable(target);

          if(plusMoves > 0 ){
            console.log("Can eat more: " + plusMoves );
            select(target);
            // activeAction="move";
            
          }else{
            console.log("Can't eat anymore: " + plusMoves );
            activeAction = "select";
            changePlayer();
          }
        
      }else{
        activeAction = "select";
        changePlayer();
      }

      // board[newpos.x][newpos.y].innerText = "X";

      console.log(board);
      
  }else{
    activeAction = "select";
    cleanMovableCells();
  }    
}


document.addEventListener('click', function(e) {
  e = e || window.event;
  let target = e.target || e.srcElement,
      text = target.textContent || target.innerText;   
      
      if(activeAction === "move" || activeAction === "eating"){
        move(target);
      }

      if(activeAction === "select"){
        select(target);
      }

      

}, false);

