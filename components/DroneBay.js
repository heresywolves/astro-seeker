const { dronesDisplay } = require('../DOMelements.js');
const drone = require('./Drone');
const { capitalizeFirstLetter, getClosestObj, calculateDistance } = require('./utils');
const objectsInSpace = require('../constants/objectsInSpace.js');

const dronebay = (() => {
  const drones = [];

  const initDrones = () => {
    let drone1 = drone('maxwell');
    drones.push(drone1);
  } 

  const updateDroneDisplay = () => {
    console.log('updating drone display')
    //clearing drones
    if (dronesDisplay.hasChildNodes()) {
      let oldEls = dronesDisplay.childNodes;
      for (let i = 0; i < oldEls.length; i++) {
        oldEls[i].remove();
      }
    }

    //adding drones
    for (let i = 0; i < drones.length; i++) {
      let curDrone = drones[i];
      dronesDisplay.appendChild(curDrone.getDomEl());
    }
  }

  initDrones();
  updateDroneDisplay();

  const deploy = (name) => {
    if (!name) {
      return "No drone name specified. Deployment cancelled";
    }  
    let closestObj = getClosestObj(ship, objectsInSpace.getAll());
    if (calculateDistance(ship, closestObj) > 20) {
      return `No celestial bodies in reach. 20m of proximity needed.`
    }
    
    for (let i = 0; i < drones.length; i++) {
      let curDrone = drones[i]; 
      if (curDrone.isDeployed()) {
        return `${capitalizeFirstLetter(curDrone.getName())} is already deployed.`
      }
      if (curDrone.getName() === name.toLowerCase()) {
        curDrone.deploy();
        updateDroneDisplay();
        return `Deployed ${capitalizeFirstLetter(name)}`
      }
    }
    return `There are no drones with the name specified.`
  }

  const getDrones = () => {
    return drones;
  }


  return {
    getDrones,
    deploy,
    updateDroneDisplay
  }
})();

module.exports = dronebay;