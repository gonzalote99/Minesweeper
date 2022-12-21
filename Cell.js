disableFriendlyErrors = true;

class Cell  {
constructor (i, j) {
  this.num;
  this.i = i;
  this.j = j;
  this.x = i * cellW;
  this.y = j * cellH;
  this.mine = false;
  this.minesAround = 0;
  this.revealed = false;
  this.clicked = false;
  this.flagged = false;
}

draw() {
if(this.revealed && this.clicked && this.mine) {
  text(DETONATION, this.x, this.y);
  return;
}

if(this.revealed && this.mine) {
  text(MINE, this.x, this.y);
  return;
}

if(this.revealed) {
  text(DIGITS[this.minesAround], this.x, this.y);
  return;
}

if(this.flagged) {
  text(FLAG, this.x, this.y);
  return;
}

text(EMPTY, this.x, this.y);
}
}