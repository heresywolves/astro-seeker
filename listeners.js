const settings = require('./gameSettings.js');
const {
  turnLeftButton,
  turnRightButton,
  increaseRCDButton,
  VODhud,
  VODvalueText,
  decreaseRCDButton,
  toggleVODButton,
  increaseVCapButton,
  decreaseVCapButton,
  terminalInput,
  RCDvalueText,
  toggleRCDButton,
  scaleValueText,
  scaleRadarDownButton,
  scaleRadarUpButton,
  engineOffButton,
  engineOnButton,
  sortDistanceTrackerButton
} = require('./DOMelements.js');
const astrotracker = require('./components/Astrotracker.js');
const radar = require('./components/Radar.js');
const ship = require('./components/Ship.js');
const terminal = require('./components/Terminal.js')

let turningInterval;
let thrustingInterval;

// Disable right mouse button click
document.addEventListener('mousedown', (event) => {
  if (event.button === 2) { // 2 represents the right mouse button
    event.preventDefault();
  }
});

// Event listener for turning the ship left
turnLeftButton.addEventListener("mousedown", function(e) {
  // disable right click to prevent bugs
  if (e.button === 2) return;
  turningInterval = setInterval(function() {
    ship.turnShip(-5); // Adjust the angle as needed for continuous turning speed
  }, settings.turningSpeed); // Adjust the interval delay as needed for continuous turning speed
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
    ship.turnShip(5); // Adjust the angle as needed for continuous turning speed
  }, settings.turningSpeed); // Adjust the interval delay as needed for continuous turning speed
});

// Event listener to stop turning the ship when mouse is released
turnRightButton.addEventListener("mouseup", function(e) {
  if (e.button === 2) return;
  clearInterval(turningInterval);
});

turnRightButton.addEventListener("mouseout", function() {
  clearInterval(turningInterval);
});

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
      ship.velocity -= settings.accelerationRate;
    }
    
    else {
      ship.velocity += settings.accelerationRate;
    }
  
    ship.calculateShipsPosition();
    radar.update();
  
    // Update ship's HUD or display to reflect new position
    ship.updateShipPosition(); // Assuming a function to update ship's position display
    ship.updateShipVelocity();
    ship.updateShipVelocityCap();

  }, settings.thrustingSpeed);
});

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
    ship.velocity <= 0 ? ship.velocity = 0 : ship.velocity -= settings.accelerationRate;
    
    ship.calculateShipsPosition();
    radar.update();
  
    ship.updateShipPosition(); 

    if (ship.velocity <= 0) {
      ship.velocity = 0;
      stopSlowDownInterval();
    }

    // ship.updateShipVelocity();

  }, settings.thrustingSpeed);
});

// Vessel origin display
toggleVODButton.addEventListener('click', () => {
  if(radar.VODisOn) {
    VODhud.style.display = 'none';
    radar.VODisOn = false;
    VODvalueText.textContent = 'OFF';
    toggleVODButton.classList.remove('active');
  } else {
    VODhud.style.display = 'block';
    radar.VODisOn = true;
    VODvalueText.textContent = 'ON';
    toggleVODButton.classList.add('active');
  }
})

// Radar contact display
toggleRCDButton.addEventListener('click', () => {
  if (radar.isRCDon()) {
    radar.toggleRCD();
    RCDvalueText.textContent = "OFF";
    toggleRCDButton.classList.remove('active');
  } else {
    radar.toggleRCD();
    RCDvalueText.textContent = radar.getRCDRadius();
    toggleRCDButton.classList.add('active');
  }
  radar.update();
})

increaseRCDButton.addEventListener('click', () => {
  let RCDradius = radar.getRCDRadius();
  if (RCDradius < radar.maxRCD) {
    radar.setRCDRadius(RCDradius += 5);
    RCDvalueText.textContent = RCDradius;
  }
  radar.update();
})

decreaseRCDButton.addEventListener('click', () => {
  let RCDradius = radar.getRCDRadius();
  if (RCDradius > 5) {
    radar.setRCDRadius(RCDradius -= 5);
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
  ship.updateShipVelocityCap();
})

decreaseVCapButton.addEventListener('click', () => {
  let newVCap = ship.velocityCap - 100;
  if (newVCap >= 100) {
    ship.velocityCap = newVCap;
  }
  ship.updateShipVelocityCap();
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


sortDistanceTrackerButton.addEventListener('click', () => {
    if (!astrotracker.isSortedByDist()) {
      sortDistanceTrackerButton.classList.add('active');
      astrotracker.sortByDistance();
      astrotracker.turnOnSortByDist();
    } else {
      sortDistanceTrackerButton.classList.remove('active');
      astrotracker.turnOffSortByDist();
    }
})