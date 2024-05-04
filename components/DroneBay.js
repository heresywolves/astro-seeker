const { dronesDisplay } = require('../DOMelements.js');
const drone = require('./Drone');
const { capitalizeFirstLetter } = require('./utils');

const dronebay = (() => {
  const drones = [];

  const initDrones = () => {
    let drone1 = drone();
    drone1.setName('maxwell');
    drones.push(drone1);
  } 

  const updateDroneDisplay = () => {
    for (let i = 0; i < drones.length; i++) {
      let curDrone = drones[i];

      const containerEl = document.createElement('div');
      containerEl.classList.add('drone-wrapper');
      
      const nameEl = document.createElement('p');
      nameEl.classList.add('drone-name');
      nameEl.textContent = capitalizeFirstLetter(curDrone.getName());

      const chargeEl = document.createElement('p');
      chargeEl.classList.add('drone-charge');
      chargeEl.textContent = curDrone.getCharge();

      containerEl.appendChild(nameEl);
      containerEl.appendChild(chargeEl);
      dronesDisplay.appendChild(containerEl);
    }
  }

  initDrones();
  updateDroneDisplay();

  const deploy = (name) => {
    if (!name) {
      return "No drone name specified. Deployment cancelled";
    }  
    for (let i = 0; i < drones.length; i++) {
      let curDrone = drones[i]; 
      if (curDrone.getName() === name.toLowerCase()) {
        return `Deploying ${capitalizeFirstLetter(name)}...`
      }
    }
    return `There are no drones with the name specified.`
  }

  const getDrones = () => {
    return drones;
  }


  return {
    getDrones,
    deploy
  }
})();

module.exports = dronebay;