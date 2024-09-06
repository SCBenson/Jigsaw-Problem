"use strict";
/*    JavaScript 7th Edition
      Chapter 10
      Project 10-01

      Project to create a drag and drop jigsaw puzzle
      Author: Gregory Simon
      Date: 05/08/2024

      Filename: project10-01.js
*/

const xCoords = [0, 1, 2, 3, 4, 5, 6, 7];
const yCoords = [0, 1, 2, 3, 4, 5];
const cornerPoints = [(0, 0), (0, 7), (0, 5), (7, 5)];
const puzzlePiece = class {
  constructor(imageName, x, y) {
    this.imageName = `./images/${imageName}`;
    this.coords = { x: x, y: y };
  }
  getCoords() {
    return this.coords;
  }

  toString() {
    return `ImageObject(imageName='${this.imageName}', coords=(${this.coords.x}, ${this.coords.y}))`;
  }
};

// Reference to the puzzle board
let puzzleBoard = document.getElementById("puzzleBoard");
// Counter for the zIndex style of each puzzle piece
let zCounter = 1;
// Array of integers from 1 to 48
let intList = new Array(48);
// Array of strings from piece1.png to piece48.png
let imgList = new Array(48);

let objectList = new Array(48);

let boardWidth = 8;
let boardHeight = 6;
// pointerX and pointerY will contain the initial coordinates of the pointerX
// pieceX and pieceY will contain the initial coordinates of a puzzle piece
let pointerX, pointerY, pieceX, pieceY;

// Sort the integers from 1 to 48 in random order
for (let i = 0; i < 48; i++) {
  intList[i] = i + 1;
  imgList[i] = `piece${i + 1}.png`; // list of img names.
}

imgList.forEach((piece, index) => {
  const x = index % boardWidth;
  const y = Math.floor(index / boardWidth);
  const imageObj = new puzzlePiece(piece, x, y);
  objectList.push(imageObj);
});

intList.sort(function () {
  return 0.5 - Math.random();
});

// generate randomly-sorted puzzle pieces
for (let i = 0; i < 48; i++) {
  let piece = document.createElement("img");
  piece.src = "./images/piece" + intList[i] + ".png";
  let rowNum = Math.ceil((i + 1) / 8);
  let colNum = i + 1 - (rowNum - 1) * 8;
  piece.style.top = (rowNum - 1) * 98 + 7 + "px";
  piece.style.left = (colNum - 1) * 98 + 7 + "px";
  piece.draggable = false; // override the default draggability of images
  puzzleBoard.appendChild(piece);
}

// Node list representing the puzzle pieces
let pieces = document.querySelectorAll("div#puzzleBoard img");

// For loop adding pointer down event listeners to all the items in pieces
for (let items of pieces) {
  items.addEventListener("pointerdown", grabPiece);
}

// Function for when a puzzle piece is grabbed
function grabPiece(e) {
  pointerX = e.clientX;
  pointerY = e.clientY;
  e.target.style.touchAction = "none";
  zCounter++;
  e.target.style.zIndex = zCounter;
  pieceX = e.target.offsetLeft;
  pieceY = e.target.offsetTop;
  e.target.addEventListener("pointermove", movePiece);
  e.target.addEventListener("pointerup", dropPiece);
}

// Function that allows the piece to be moved
function movePiece(e) {
  let diffX = e.clientX - pointerX;
  let diffY = e.clientY - pointerY;
  e.target.style.left = pieceX + diffX + "px";
  e.target.style.top = pieceY + diffY + "px";
}

// Function for when the piece is dropped
function dropPiece(e) {
  e.target.removeEventListener("pointermove", movePiece);
  e.target.removeEventListener("pointerup", dropPiece);
}
