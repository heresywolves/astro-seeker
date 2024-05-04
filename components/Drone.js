const { droneCargoContainer } = require('../DOMelements');
const { getClosestObj } = require('../components/utils');
const objectsInSpace = require('../constants/objectsInSpace.js');

const drone = () => {
  const MAXCHARGE = 100;
  const inventory = [];
  let name = "";
  const getInventory = () => { return inventory };

  const charge = MAXCHARGE;
  const getCharge = () => { return charge };

  const changeCharge = (ammount) => {
    if ((charge + ammount) < 0) {
      charge = 0;
      returnHome();
    } else if ((charge + ammount) > MAXCHARGE) {
      charge = MAXCHARGE;
    } else {
      charge -= ammount;
    }
  }

  let chargingTimer;
  const startCharging = () => {
    chargingTimer = setInterval(() => {
      changeCharge(5);
    }, 5000);
  }

  const cancelCharging = () => {
    clearInterval(chargingTimer);
  } 

  const scanRoom = () => {
    changeCharge(-5);
  }

  const returnHome = () => {
    startCharging(); 
  }

  const setName = (text) => {
    name = text;
  }

  const getName = () => {
    return name;
  }

  const deploy = () => {
    console.log(getClosestObj(objectsInSpace.getAll()));
    
    if (chargingTimer) {
      cancelCharging()
    }
  }

  return {
    getCharge,
    getInventory,
    deploy,
    setName,
    getName
  }
};

module.exports = drone;