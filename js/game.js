

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
    this.n = n;
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

    setTimeout(() => {
      board[startX][startY].classList.add("red");
      redMen.push(new Man(redMen.length, {x:startX, y:startY}));
    }, 200*(j+(i*4)));
    
    
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
    setTimeout(() => {
      board[startX][startY].classList.add("white");
      redMen.push(new Man(redMen.length, {x:startX, y:startY}));
    }, 2600+ 200*(j+(i*4)));
    
  }
}



console.log(redMen)
console.log(board)