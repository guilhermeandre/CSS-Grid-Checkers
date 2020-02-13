
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
      redMen.push(new Man("red-"+redMen.length, { x:startX, y:startY }));
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
      whiteMen.push(new Man("white-"+whiteMen.length, {x:startX, y:startY}));
      board[startX][startY].setAttribute("id", "white-"+whiteMen[whiteMen.length-1].id );
    // }, 2600+ 200*(j+(i*4)));
    
  }
}



console.log(redMen)
console.log(board)

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
}



function move(target) {
  
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

    target.setAttribute('id', selected.id);
    target.classList.add(baseClass);
    selected.removeAttribute('id');
    selected.classList.remove(baseClass);

    activeAction = "select";
  
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

