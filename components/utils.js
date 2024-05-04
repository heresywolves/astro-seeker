const objectsInSpace = require('../constants/objectsInSpace.js');

function roundToFive(x) {
  return Math.ceil(x / 5) * 5; 
}

function capitalizeFirstLetter(word) {
  return word[0].trim().toUpperCase() + word.slice(1);
}

function drawCircle(x, y, radius, context) {
  context.beginPath();
  context.arc(x, y, radius, 0, 2 * Math.PI, false);
  context.fillStyle = 'white';
  context.fill();
}

function clearCanvas(context) {
  context.clearRect(0, 0, canvas.width, canvas.height);
}

const getObjectByName = (name) => {
  let foundEl;
  objectsInSpace.getAll().forEach((el) => {
    if (el.name === name) {
      foundEl = el;
    }
  })
  return foundEl;
}

function shuffleArray(orig) {
  const array = [...orig];
  let currentIndex = array.length;
  while (currentIndex != 0) {
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
  return array;
}

// Euclidean distance formula
function calculateDistance(object1, object2) {
    const x1 = object1.x;
    const y1 = object1.y;
    const x2 = object2.x;
    const y2 = object2.y;
    const dx = x2 - x1;
    const dy = y2 - y1;
    // Calculate the square of the differences
    const squaredDistance = Math.pow(dx, 2) + Math.pow(dy, 2);
    // Return the square root of the sum
    const sqrtDistance = Math.sqrt(squaredDistance);
    return Math.floor(sqrtDistance * 10) - Math.floor(object2.radius) * 10 - 70;
}

function getClosestObj(objects) {
  let lowest = 999999999;
  
  for (let i = 0; i < objects.length; i++) {
    let object = objects[i];
    console.log(object);
    let distance = calculateDistance(ship, object);
    if (distance < lowest) {
      lowest = distance;
    }
  }
  return lowest;
}

// random int including 0 and excluding max
function randomInt(max) {
  return Math.floor(Math.random() * max);
}

function constructObjectName(index) {
  let firstRandL = getRandomUppercaseLetter();
  let secondRandL = getRandomUppercaseLetter();
  return `${firstRandL}${secondRandL}-${randomInt(10)}${randomInt(10)}${index}${randomInt(10)}`;
}

function getRandomUppercaseLetter() {
    // Generate a random number between 65 (ASCII for 'A') and 90 (ASCII for 'Z')
    const randomNumber = Math.floor(Math.random() * (90 - 65 + 1)) + 65;
    // Convert the random number to its corresponding character
    const randomUppercaseLetter = String.fromCharCode(randomNumber);
    return randomUppercaseLetter;
}

function reverseString(str) {
    var splitString = str.split(""); // var splitString = "hello".split("");
    var reverseArray = splitString.reverse(); // var reverseArray = ["h", "e", "l", "l", "o"].reverse();
    var joinArray = reverseArray.join(""); // var joinArray = ["o", "l", "l", "e", "h"].join("");
    return joinArray; // "olleh"
}

module.exports = {
  roundToFive,
  drawCircle,
  clearCanvas,
  getObjectByName,
  calculateDistance,
  randomInt,
  constructObjectName,
  reverseString,
  shuffleArray,
  getClosestObj,
  capitalizeFirstLetter
}