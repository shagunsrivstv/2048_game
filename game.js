var board;
var score = 0;
var bestScore = 0;
var rows = 4;
var columns = 4;

let reset = document.getElementById("resetBtn");
reset.onclick = () => {
board = [[0, 0, 0, 0],
[0, 0, 0, 0],
[0, 0, 0, 0],
[0, 0, 0, 0]
];
score = 0;
document.getElementById("Score").innerText = score;
loadBestScore(); // Ensure the best score is loaded on reset

for (let r = 0; r < rows; r++) {
for (let c = 0; c < columns; c++) {
let tile = document.getElementById(r.toString() + "-" + c.toString());
let num = board[r][c];
updateTile(tile, num);
}
}

// Set two initial tiles
setTwo();
setTwo();
}

window.onload = function () {
setGame();
}

function setGame() {
board = [[0, 0, 0, 0],
[0, 0, 0, 0],
[0, 0, 0, 0],
[0, 0, 0, 0]
];
for (let r = 0; r < rows; r++) {
for (let c = 0; c < columns; c++) {
let tile = document.createElement("div");
tile.id = r.toString() + "-" + c.toString();
let num = board[r][c];
updateTile(tile, num);
document.getElementById("board").append(tile);
}
}
setTwo();
setTwo();
loadBestScore(); // Ensure the best score is loaded on game start
}

function updateTile(tile, num) {
tile.innerText = "";
tile.classList.value = "";
tile.classList.add("tile");
if (num > 0) {
tile.innerText = num.toString();
if (num <= 1024) {
tile.classList.add("x" + num.toString());
} else {
tile.classList.add("x2048");
}
}
}

function isGameOver() {
if (!hasEmptyTile()) {
// Check if any neighboring tiles can merge
for (let r = 0; r < rows; r++) {
for (let c = 0; c < columns; c++) {
let current = board[r][c];
let right = c < columns - 1 ? board[r][c + 1] : null;
let down = r < rows - 1 ? board[r + 1][c] : null;
if (current === right || current === down) {
return false; // Game can continue
}
}
}
return true; // No neighboring tiles can merge
}
return false; // There are still empty tiles
}

function setTwo() {
if (!hasEmptyTile()) {
return;
}
let found = false;
while (!found) {
let r = Math.floor(Math.random() * rows);
let c = Math.floor(Math.random() * columns);
if (board[r][c] == 0) {
board[r][c] = 2;
let tile = document.getElementById(r.toString() + "-" + c.toString());
tile.innerText = "2";
tile.classList.add("tile");
tile.classList.add("x2");
found = true;
}
}
}

function hasEmptyTile() {
for (let r = 0; r < rows; r++) {
for (let c = 0; c < columns; c++) {
if (board[r][c] == 0) {
return true;
}
}
}
return false;
}

document.addEventListener("keyup", (e) => {
if (e.code == "ArrowLeft") {
slideLeft();
setTwo();
}
else if (e.code == "ArrowRight") {
slideRight();
setTwo();
}
else if (e.code == "ArrowUp") {
slideUp();
setTwo();
}
else if (e.code == "ArrowDown") {
slideDown();
setTwo();
}
if (isGameOver()) {
// Game over logic
alert("Game over! Your score: " + score);
}
document.getElementById("Score").innerText = score;
updateBestScore(); // Update the best score after each move
});

function filterZeroes(row) {
return row.filter(num => num != 0);
}

function slide(row) {
//[0,2,2,2]
row = filterZeroes(row);
//[2,2,2]
for (let i = 0; i < row.length - 1; i++) {
if (row[i] == row[i + 1]) {
row[i] *= 2;
row[i + 1] = 0;
score += row[i];
}
}
//[4,0,2]
row = filterZeroes(row);
//[4,2]
while (row.length < columns) {
row.push(0);
}
return row;
}

function slideLeft() {
for (let r = 0; r < rows; r++) {
let row = board[r];
row = slide(row);
board[r] = row; //updating slided row
// updates the visual representation of the board
for (let c = 0; c < columns; c++) {
let tile = document.getElementById(r.toString() + "-" + c.toString());
let num = board[r][c];
updateTile(tile, num);
}
}
}

function slideRight() {
for (let r = 0; r < rows; r++) {
let row = board[r];
row.reverse();
row = slide(row);
board[r] = row.reverse(); //updating slided row
// updates the visual representation of the board
for (let c = 0; c < columns; c++) {
let tile = document.getElementById(r.toString() + "-" + c.toString());
let num = board[r][c];
updateTile(tile, num);
}
}
}

function slideUp() {
for (let c = 0; c < columns; c++) {
let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
row = slide(row);
for (let r = 0; r < rows; r++) {
board[r][c] = row[r];
let tile = document.getElementById(r.toString() + "-" + c.toString());
let num = board[r][c];
updateTile(tile, num);
}
}
}

function slideDown() {
for (let c = 0; c < columns; c++) {
let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
row.reverse();
row = slide(row);
row.reverse();
for (let r = 0; r < rows; r++) {
board[r][c] = row[r];
let tile = document.getElementById(r.toString() + "-" + c.toString());
let num = board[r][c];
updateTile(tile, num);
}
}
}

// Load best score from local storage
function loadBestScore() {
const storedBestScore = localStorage.getItem('bestScore');
if (storedBestScore !== null) {
bestScore = parseInt(storedBestScore);
document.getElementById("bestScore").innerText = bestScore; // Display the best score
}
}

// Save best score to local storage
function saveBestScore() {
localStorage.setItem('bestScore', bestScore);
}

// Update the best score if the current score is higher
function updateBestScore() {
if (score > bestScore) {
bestScore = score;
document.getElementById("bestScore").innerText = bestScore; // Update and display the best score
saveBestScore(); // Save the new best score to local storage
}
}
