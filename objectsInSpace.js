const objectsInSpace = [];

function generateObjectDiagram() {
  availableSymbols = ["|", "-", "_"];
  resultStr = ``;
  let lineCount = 1;
  let numOfSpaces = randomInt(5) + 5;
  const MAXROWSYMBOLS = 20;
  let MAXROWS = 8;
  for (let i = 0; i < MAXROWS; i++) {
    let line = "";

    if (lineCount === 1) {
      for (let i = 0; i < numOfSpaces; i++) {
        line = line + " ";
      }
      let randSymbol = availableSymbols[randomInt(availableSymbols.length)];
      for (let i = 0; i < MAXROWSYMBOLS/2 - numOfSpaces; i++) {
        line = line + randSymbol;
      }
      resultStr = resultStr + line + reverseString(line) + "\n";
    } 
    
    else if (lineCount === MAXROWS) {
      numOfSpaces += randomInt(3) - 1;
      for (let i = 0; i < numOfSpaces; i++) {
        line = line + " ";
      }
      let randSymbol = availableSymbols[randomInt(availableSymbols.length)];
      for (let i = 0; i < MAXROWSYMBOLS/2 - numOfSpaces + 1; i++) {
        line = line + randSymbol;
      }
      resultStr = resultStr + line + reverseString(line) + "\n";
    } 
    
    else {
      numOfSpaces += randomInt(3) - 1;
      let randSymbol = availableSymbols[randomInt(availableSymbols.length)];
      for (let i = 0; i < numOfSpaces; i++) {
        line = line + " ";
      }
      line = line + randSymbol;
      for (let i = 0; i < MAXROWSYMBOLS/2 - numOfSpaces; i++) {
        line = line + " ";
      }
      resultStr = resultStr + line + reverseString(line) + "\n";
    }

    lineCount++;
  }
  return resultStr;
}

function generateObjectsInSpace() {
  let count = 0;
  let totalMediumLvlObjects = randomInt(6) + 5;
  let totalLowLvlObjects = randomInt(6) + 5;
  let totalHighLvlObjects = randomInt(6) + 5;
  let totalObjects = totalHighLvlObjects + totalLowLvlObjects + totalMediumLvlObjects;
  for (let i = 0; i < totalLowLvlObjects; i++) {
    objectsInSpace.push({
      x: randomInt(4000) - 2000,
      y: randomInt(4000) - 2000,
      radius: randomInt(55) + 5,
      name: constructObjectName(count),
      lvl: 'low',
      publicLvl: '????',
      diagram: generateObjectDiagram(),
    })
    count++;
  }
  for (let i = 0; i < totalMediumLvlObjects; i++) {
    objectsInSpace.push({
      //50% of being a negative value
      x: (randomInt(2)) ? randomInt(2000) + 1000 : -(randomInt(2000) + 1000),
      y: (randomInt(2)) ? randomInt(2000) + 1000 : -(randomInt(2000) + 1000),
      radius: randomInt(55) + 5,
      name: constructObjectName(count),
      lvl: 'medium',
      publicLvl: '????',
      diagram: generateObjectDiagram(),
    })
    count++;
  }
  for (let i = 0; i < totalHighLvlObjects; i++) {
    objectsInSpace.push({
      x: (randomInt(2)) ? randomInt(4000) + 2000 : -(randomInt(4000) + 2000),
      y: (randomInt(2)) ? randomInt(4000) + 2000 : -(randomInt(4000) + 2000),
      radius: randomInt(55) + 5,
      name: constructObjectName(count),
      lvl: 'high',
      publicLvl: '????',
      diagram: generateObjectDiagram(),
    })
    count++;
  }
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

generateObjectsInSpace();
console.log(objectsInSpace);

// random int including 0 and excluding max
function randomInt(max) {
  return Math.floor(Math.random() * max);
}

module.exports = objectsInSpace