const turnLeftButton = document.getElementById("turnLeftButton");
const turnRightButton = document.getElementById("turnRightButton");
const shipDirectionPointer = document.getElementById("shipDirectionPointer");
const shipDirectionValueHud = document.getElementById("shipDirectionValue");
const engineOnButton = document.getElementById('engineOnButton');
const engineOffButton = document.getElementById('engineOffButton');
const canvas = document.getElementById('canvas');
const shipVelocityHud = document.getElementById('shipVelocity');
const scaleRadarDownButton = document.getElementById('scaleRadarDown');
const scaleRadarUpButton = document.getElementById('scaleRadarUp');
const scaleValueText = document.getElementById('scaleValueText');
const shipCoordinatesXHud = document.getElementById('shipCoordinateX');
const shipCoordinatesYHud = document.getElementById('shipCoordinateY');
const toggleVODButton = document.getElementById('toggleVODButton');
const toggleRCDButton = document.getElementById('toggleRCDButton');
const increaseRCDButton = document.getElementById('increaseRCDButton');
const decreaseRCDButton = document.getElementById('decreaseRCDButton');
const RCDvalueText = document.getElementById('RCDvalueText');
const increaseVCapButton = document.getElementById('increaseVCapButton');
const decreaseVCapButton = document.getElementById('decreaseVCapButton');
const VODhud = document.getElementById('VOD');
const VODvalueText = document.getElementById('VODvalueText');
const velocityCapHud = document.getElementById('velocityCap');
const objectsInSpace = require('./objectsInSpace.js');
const terminalInput = document.getElementById('terminalInput');
const terminalOutput = document.getElementById('terminalOutput');
let astrotrackerDisplay = document.getElementById('astrotrackerDisplay');
const astrotrackerContainer = document.getElementById('astrotrackerContainer');
const sortDistanceTrackerButton = document.getElementById('sortDistanceTrackerButton');

// Disable right mouse button click
document.addEventListener('mousedown', (event) => {
  if (event.button === 2) { // 2 represents the right mouse button
    event.preventDefault();
  }
});

const ship = {
  x: 0,
  y: 0,
  direction: 0,
  speed: 1,
  velocity: 0,
  engineOn: false,
  engineLvl: 7,
  velocityCap: 100
}

// const maxVelocity = 100;
let turningInterval;
let thrustingInterval;
let turningSpeed = 50;
let thrustingSpeed = 50;
let accelerationRate = 5;
let VODisOn = true;
let RCDisOn = true;
let maxRCD = 70;
let RCDradius = 5;

// Function to update ship direction on the screen
function updateShipDirection() {
  shipDirectionValueHud.textContent = ship.direction;
  shipDirectionPointer.style.transform = `rotate(${-ship.direction}deg)`;
}

function updateShipPosition() {
  shipCoordinatesXHud.textContent = Math.round(ship.x);
  shipCoordinatesYHud.textContent = Math.round(ship.y);
}

function updateShipVelocity() {
  shipVelocityHud.textContent = ship.velocity;
}

// Function to handle turning the ship
function turnShip(angle) {
  // subtract the angle rather than add because it just works with everything rn
  ship.direction -= angle;
  // Ensure direction stays within 0 to 360 range
  if (ship.direction < 0) {
    ship.direction += 360;
  } else if (ship.direction >= 360) {
    ship.direction -= 360;
  }
  updateShipDirection();
}

// Event listener for turning the ship left
turnLeftButton.addEventListener("mousedown", function(e) {
  // disable right click to prevent bugs
  if (e.button === 2) return;
  turningInterval = setInterval(function() {
    turnShip(-5); // Adjust the angle as needed for continuous turning speed
  }, turningSpeed); // Adjust the interval delay as needed for continuous turning speed
});

// Event listener to stop turning the ship when mouse is released
turnLeftButton.addEventListener("mouseup", function(e) {
  // disable right click to prevent bugs
  if (e.button === 2) return;
  clearInterval(turningInterval);
});

turnLeftButton.addEventListener("mouseout", function() {
  clearInterval(turningInterval);
});

// Event listener for turning the ship right
turnRightButton.addEventListener("mousedown", function(e) {
  if (e.button === 2) return;
  turningInterval = setInterval(function() {
    turnShip(5); // Adjust the angle as needed for continuous turning speed
  }, turningSpeed); // Adjust the interval delay as needed for continuous turning speed
});

// Event listener to stop turning the ship when mouse is released
turnRightButton.addEventListener("mouseup", function(e) {
  if (e.button === 2) return;
  clearInterval(turningInterval);
});

turnRightButton.addEventListener("mouseout", function() {
  clearInterval(turningInterval);
});

function roundToFive(x) {
  return Math.ceil(x / 5) * 5; 
}

engineOnButton.addEventListener('click', () => {
  if (ship.engineOn) {
    return;
  };
  ship.engineOn = true;
  stopSlowDownInterval();
  thrustingInterval = setInterval(function() {
    // We can't go faster than the velocity cap

    if (ship.velocity == ship.velocityCap) {
      ship.velocity = ship.velocityCap
    } 

     else if (ship.velocity > ship.velocityCap) {
      ship.velocity -= accelerationRate;
    }
    
    else {
      ship.velocity += accelerationRate;
    }
  
    calculateShipsPosition();
    radar.update();
  
    // Update ship's HUD or display to reflect new position
    updateShipPosition(); // Assuming a function to update ship's position display
    updateShipVelocity();
    updateShipVelocityCap();

  }, thrustingSpeed);
});

function updateShipVelocityCap() {
  velocityCapHud.textContent = ship.velocityCap;
}

// this interval needs to be available to the Engine ON handler
let slowDownInterval;
let stopSlowDownInterval = () => {
  clearInterval(slowDownInterval);
}

engineOffButton.addEventListener('click', () => {
  if (!ship.engineOn) {
    return
  };
  ship.engineOn = false;
  clearInterval(thrustingInterval);
  slowDownInterval = setInterval(function() {
    ship.velocity <= 0 ? ship.velocity = 0 : ship.velocity -= accelerationRate;
    
    calculateShipsPosition();
    radar.update();
  
    // Update ship's HUD or display to reflect new position
    updateShipPosition(); // Assuming a function to update ship's position display

    if (ship.velocity <= 0) {
      ship.velocity = 0;
      stopSlowDownInterval();
    }

    updateShipVelocity();

  }, thrustingSpeed);
});

// Vessel origin display
toggleVODButton.addEventListener('click', () => {
  if(VODisOn) {
    VODhud.style.display = 'none';
    VODisOn = false;
    VODvalueText.textContent = 'OFF';
    toggleVODButton.classList.remove('active');
  } else {
    VODhud.style.display = 'block';
    VODisOn = true;
    VODvalueText.textContent = 'ON';
    toggleVODButton.classList.add('active');
  }
})

// Radar contact display
toggleRCDButton.addEventListener('click', () => {
  if (RCDisOn) {
    RCDisOn = false;
    RCDvalueText.textContent = "OFF";
    toggleRCDButton.classList.remove('active');
  } else {
    RCDisOn = true;
    RCDvalueText.textContent = RCDradius;
    toggleRCDButton.classList.add('active');
  }
  radar.update();
})

increaseRCDButton.addEventListener('click', () => {
  if (RCDradius < maxRCD) {
    RCDradius += 5;
    RCDvalueText.textContent = RCDradius;
  }
  radar.update();
})

decreaseRCDButton.addEventListener('click', () => {
  if (RCDradius > 5) {
    RCDradius -= 5;
    RCDvalueText.textContent = RCDradius;
  }
  radar.update();
})

// Velocity cap control
increaseVCapButton.addEventListener('click', () => {
  let newVCap = ship.velocityCap + 100;
  if (newVCap <= ship.engineLvl * 100) {
    ship.velocityCap = newVCap;
  }
  updateShipVelocityCap();
})

decreaseVCapButton.addEventListener('click', () => {
  let newVCap = ship.velocityCap - 100;
  if (newVCap >= 100) {
    ship.velocityCap = newVCap;
  }
  updateShipVelocityCap();
})


// radar scaling controls
scaleRadarDownButton.addEventListener('click', () => {
  radar.changeScale(-2);
  scaleValueText.textContent = radar.getRadarScale() / 2;
})

scaleRadarUpButton.addEventListener('click', () => {
  radar.changeScale(2);
  scaleValueText.textContent = radar.getRadarScale() / 2;
})

function calculateShipsPosition() {
    // Calculate new x and y coordinates based on ship's direction and speed
    const angleInRadians = (ship.direction * Math.PI) / 180;
    // devide ship velocity by 100 because a 100 is too much for the canvas
    const newX = ship.x + Math.cos(angleInRadians) * (ship.velocity / 100);
    const newY = ship.y + Math.sin(angleInRadians) * (ship.velocity / 100);
  
    // Update ship's position
    ship.x = newX;
    ship.y = newY;
}

//setup canvas
const context = canvas.getContext('2d');
canvas.width = 400;
canvas.height = 400;

function drawCircle(x, y, radius) {
  context.beginPath();
  context.arc(x, y, radius, 0, 2 * Math.PI, false);
  context.fillStyle = 'white';
  context.fill();
}

function clearCanvas() {
  context.clearRect(0, 0, canvas.width, canvas.height);
}


const radar = (function() {
  let radarScale = 1;
  const maxScale = 31;

  const update = () => {
    clearCanvas();
    // update object in space
    if (RCDisOn) {
      objectsInSpace.forEach((object) => {
        drawCircle(
          object.x - ship.x + canvas.width/2, 
          object.y*-1 + ship.y + canvas.width/2, 
          (object.radius > RCDradius) ? object.radius : RCDradius
          );
      })
    }
  }

  const changeScale = (scaleNum)  =>{
    let temp = radarScale + scaleNum;
    if (temp > 0 && temp < maxScale) {
      radarScale += scaleNum;
      getRadarScale();
    }
    canvas.width = 400 * radarScale;
    canvas.height = 400 * radarScale;
    canvas.style.transform = `scale(${400 / canvas.width})`
    update();
  }

  const getRadarScale = () => {
    return radarScale;
  }

  return {update, changeScale, getRadarScale}
})();

terminalInput.addEventListener('keydown', (event) => {
    // Check if the key pressed is Enter (key code 13)
    if (event.key === "Enter") {
      event.preventDefault();
      const text = terminalInput.value;
      terminalInput.value = '';
      terminal.sendCommand(text);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      let prevCommand = terminal.getPastCommand();
      terminalInput.value = prevCommand;
    } else if (event.key === "ArrowDown") {
      event.preventDefault();
      let nextCommand = terminal.getRecentCommand();
      terminalInput.value = nextCommand;
    }
});

const getObjectByName = (name) => {
  let foundEl;
  objectsInSpace.forEach((el) => {
    if (el.name === name) {
      foundEl = el;
    }
  })
  return foundEl;
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

const astrotracker = (() => {
  let astrotrackerDistSorted = false;

  const sortByDistance = () => {
    const nodesArr = [...astrotrackerDisplay.childNodes];
    const sortedNodesArr = nodesArr.sort((a, b) => {
      let first = a.querySelector('.tracker-distance').textContent;
      first = (first.includes('km')) ? first.split('km')[0] : first.split('m')[0] / 1000;
      let second = b.querySelector('.tracker-distance').textContent;
      second = (second.includes('km')) ? second.split('km')[0] : second.split('m')[0] / 1000;
      return first - second;
    });
    clearAstrotrackerDisplay();
    sortedNodesArr.forEach(el => astrotrackerDisplay.appendChild(el))
  }

  const clearAstrotrackerDisplay = () => {
    astrotrackerDisplay.remove();
    astrotrackerDisplay = document.createElement('div');
    astrotrackerDisplay.setAttribute('id', 'astrotrackerDisplay');
    astrotrackerContainer.appendChild(astrotrackerDisplay);
  }

  const scan = async (subject) => {
    if (subject && subject != "") {
      let object = getObjectByName(subject);
      if (object) {
        object.publicLvl = object.lvl;
        distanceToObject = calculateDistance(ship, object);
        terminal.printOut(`Object scan successful

        Retrieved information:
        
        Name: ${subject}
        x-coordinate: ${object.x}
        y-coordinate: ${object.y}
        Radius: ${object.radius}m
        Security level: ${object.publicLvl}
        Distance: ${distanceToObject < 0 ? 0 : distanceToObject}m\n
        `)
        // if the object is close enough performa a deepscan
        if (calculateDistance(ship, object) <= 20) {
          terminal.printOut(`Performing a deepscan...`);
          let loadingDone = await terminal.printOutLoading(50);
          terminal.printOut('Deepscan complete. Printing results:');
          terminal.printOut(object.diagram, true);
          terminal.printOut(`
          Type: ${object.type}
          Description: ${object.description}
          `);
        }
      } else {
        terminal.printOut(`Object scan failed. There are no objects found with a name ${subject}`);
      }
    }
    // Update scanner display
    clearAstrotrackerDisplay();
    objectsInSpace.forEach((object) => {
      const objContainer = document.createElement('div');
      objContainer.classList.add('scanned-obj-container');
      const name = document.createElement('span');
      name.classList.add('scanned-obj-name');
      name.textContent = object.name;
      const distanceEl = document.createElement('span');
      let distance = calculateDistance(ship, object);
      distance = distance < 0 ? 0 : distance;
      distanceEl.textContent = (Math.floor(distance / 3000) > 0) ? (Math.floor((distance / 1000) * 10) / 10) + "km" : distance + "m"; 
      distanceEl.classList.add('tracker-distance');
      const securityLvl = document.createElement('span');
      securityLvl.classList.add('security-lvl');
      securityLvl.textContent = object.publicLvl;
      objContainer.appendChild(name);
      objContainer.appendChild(securityLvl);
      objContainer.appendChild(distanceEl);
      astrotrackerDisplay.appendChild(objContainer);
    } )
    if (astrotrackerDistSorted) {
      sortByDistance();
    }
  }

  const isSortedByDist = () => {
    return astrotrackerDistSorted;
  }

  const turnOffSortByDist = () => {
    astrotrackerDistSorted = false;
  }

  const turnOnSortByDist = () => {
    astrotrackerDistSorted = true;
  }

  return {sortByDistance, isSortedByDist, clearAstrotrackerDisplay, scan, turnOffSortByDist, turnOnSortByDist}
})();

sortDistanceTrackerButton.addEventListener('click', () => {
  console.log(astrotracker.isSortedByDist());
    if (!astrotracker.isSortedByDist()) {
      sortDistanceTrackerButton.classList.add('active');
      astrotracker.sortByDistance();
      astrotracker.turnOnSortByDist();
    } else {
      sortDistanceTrackerButton.classList.remove('active');
      astrotracker.turnOffSortByDist();
    }
})

const terminal = (function() {
  const commandHistory = [];
  let historyIndex = 0;

  const clearLastOutput = () => {
    terminalOutput.lastChild.remove();
  }

  const getPastCommand  = () => {
    if (commandHistory.length === 0) return "";
    if (historyIndex > 0) historyIndex -= 1;
    let command = commandHistory[historyIndex];
    return command;
  }

  const printOutLoading = async (interval) => {
      return new Promise((resolve) => {
          let loadingStr = "[#-------------------]";
          terminal.printOut(loadingStr);
          const timer = setInterval(() => {
              terminal.clearLastOutput();
              if (loadingStr.includes('-')) {
                  loadingStr = loadingStr.replace('-', '#');
                  terminal.printOut(loadingStr);
              } else {
                  clearInterval(timer);
                  resolve(true); // Resolve the promise when loading is complete
              }
          }, interval);
      });
  };

  const getRecentCommand = () => {
    if (!commandHistory[historyIndex + 1]) return "";
    historyIndex += 1;
    let command = commandHistory[historyIndex];
    return command;
  }

  const runHelp = () => {
    printOut(`Here is a list of available commands:
      There are none yet....  `)
  }

  const runTrackerScan = (subject) => {
    astrotracker.scan(subject);
  }

  const sendCommand = (command) => {
    commandHistory.push(command);
    historyIndex = commandHistory.length;
    words = command.split(' ');

    switch (words[0]) {
      case 'help':
        runHelp();
        break;
      case 'scan':
        // if there are arguments passed to the scan
        if (words.length > 1 && words[1] != "") {
          runTrackerScan(words[1]);
        } else {
          printOut(`Scanning complete. Results sent to the Astrotracker`)
          runTrackerScan();
        }
        break;
      default:
        printOut(`Error - Command "${command}" does not exist
        To see a list of available commands type "help"`);
    }
  }

  const printOut = (text, centered) => {
    const outputEl = document.createElement('p');
    outputEl.classList.add('terminal-output');
    if (centered) {
      outputEl.classList.add('centered-text');
    }
    // Split the text into two parts where you want the break line
    const parts = text.split('\n');
    // Append each part as a text node or a break line
    parts.forEach((part, index) => {
        // format white spaces
        let formattedPart = part.replaceAll(' ', '&nbsp;');
        outputEl.innerHTML += formattedPart;
        // Add a break line if not the last part
        if (index < parts.length - 1) {
            outputEl.appendChild(document.createElement('br'));
        }
    });
    terminalOutput.appendChild(outputEl);
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
  }

  return {sendCommand, getPastCommand, getRecentCommand, printOut, clearLastOutput, printOutLoading}
})();


// Initial updates and settings on game start
radar.update();

updateShipDirection();

radar.changeScale(1);