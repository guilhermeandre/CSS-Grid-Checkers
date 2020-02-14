
var selected;
var activePlayer = 0;
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

  // console.log(board[9][10].classList.contains("white"));

  if(selected.pos.x > 0 && selected.pos.y > 0){
    if ( !board[selectedMan.pos.x-1][selectedMan.pos.y-1].classList.contains( "red") && !board[selectedMan.pos.x-1][selectedMan.pos.y-1].classList.contains( "white")){
      board[selectedMan.pos.x-1][selectedMan.pos.y-1].classList.add("movable");
    }
  }

  if(selected.pos.x < 7 && selected.pos.y > 0){
    if ( !board[selectedMan.pos.x+1][selectedMan.pos.y-1].classList.contains( "red") && !board[selectedMan.pos.x+1][selectedMan.pos.y-1].classList.contains( "white")){
      board[selectedMan.pos.x+1][selectedMan.pos.y-1].classList.add("movable");
    }
  }
  
  if(selected.pos.x < 7 && selected.pos.y < 7){
    if ( !board[selectedMan.pos.x+1][selectedMan.pos.y+1].classList.contains( "red") && !board[selectedMan.pos.x+1][selectedMan.pos.y+1].classList.contains( "white")){
      board[selectedMan.pos.x+1][selectedMan.pos.y+1].classList.add("movable");
    }
  }

  if(selected.pos.x > 0 && selected.pos.y < 7){  
    if ( !board[selectedMan.pos.x-1][selectedMan.pos.y+1].classList.contains( "red") && !board[selectedMan.pos.x-1][selectedMan.pos.y+1].classList.contains( "white")){
      board[selectedMan.pos.x-1][selectedMan.pos.y+1].classList.add("movable");
    }
  }  

}

function select(target){
  if(activePlayer === 0){
    if(target.classList[1] != 'red'){
      return console.log("Select a RED man!")
    }
  }else{
    if(target.classList[1] != 'white'){
      return console.log("Select a WHITE man!")
    }
  }
  selected = target;
  activeAction = "move";
  console.log(activeAction);

  // checkIfMovable(selected);

  console.log( selected.pos);


}



function move(target) {
  
  if(true ){
      let baseId;

      if(activePlayer === 0){
        baseId = 'red-';
        baseClass = 'red';
        activePlayer = 1;
      }else{
        baseId = "white-";
        baseClass = 'white';
        activePlayer = 0;
      }

      // let manId = selected.id.replace(baseId,'');
      // manId=manId.replace(baseId,'');
      // console.log(manId);

      
      
      // setTimeout(() => {
      //   let movableCells = document.getElementsByClassName("movable");

      //    console.log(movableCells);
      //   for(let i = 0; i < movableCells.length; i++ ){
      //     movableCells[i].classList.remove("movable");
      //   }
        
      // }, 100);

      

      target.setAttribute('id', selected.id);
      


      target.classList.add(baseClass);
      selected.removeAttribute('id');
      selected.classList.remove(baseClass);

      activeAction = "select";

      // board[newpos.x][newpos.y].innerText = "X";
      
  }    
}


document.addEventListener('click', function(e) {
  e = e || window.event;
  let target = e.target || e.srcElement,
      text = target.textContent || target.innerText;   
      
      if(activeAction === "move"){
        move(target);
      }

      if(activeAction === "select"){
        select(target);
      }

      

}, false);

