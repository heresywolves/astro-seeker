const { 
  shipVelocityHud,
  shipCoordinatesXHud,
  shipCoordinatesYHud,
  shipDirectionPointer,
  shipDirectionValueHud,
  velocityCapHud
} = require('../DOMelements.js');

const ship = {
  x: 0,
  y: 0,
  direction: 0,
  speed: 1,
  velocity: 0,
  engineOn: false,
  engineLvl: 7,
  velocityCap: 100,
  inventory: [],
  addToInventory: (arr) => {
    ship.inventory.push(...arr)
  },
  getInventory: () => {
    return ship.inventory;
  },
  // Function to update ship direction on the screen
  updateShipDirection: () => {
    shipDirectionValueHud.textContent = ship.direction;
    shipDirectionPointer.style.transform = `rotate(${-ship.direction}deg)`;
  },
  updateShipPosition: () => {
    shipCoordinatesXHud.textContent = Math.round(ship.x);
    shipCoordinatesYHud.textContent = Math.round(ship.y);
  },
  updateShipVelocity: () => {
    shipVelocityHud.textContent = ship.velocity;
  },
  // Function to handle turning the ship
  turnShip: (angle) => {
    // subtract the angle rather than add because it just works with everything rn
    ship.direction -= angle;
    // Ensure direction stays within 0 to 360 range
    if (ship.direction < 0) {
      ship.direction += 360;
    } else if (ship.direction >= 360) {
      ship.direction -= 360;
    }
    ship.updateShipDirection();
  },
  updateShipVelocityCap: () => {
    velocityCapHud.textContent = ship.velocityCap;
  },
  calculateShipsPosition: () => {
    // Calculate new x and y coordinates based on ship's direction and speed
    const angleInRadians = (ship.direction * Math.PI) / 180;
    // devide ship velocity by 100 because a 100 is too much for the canvas
    const newX = ship.x + Math.cos(angleInRadians) * (ship.velocity / 100);
    const newY = ship.y + Math.sin(angleInRadians) * (ship.velocity / 100);
  
    // Update ship's position
    ship.x = newX;
    ship.y = newY;
  }
}

module.exports = ship;