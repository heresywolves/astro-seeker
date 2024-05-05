const { droneCargoContainer } = require('../DOMelements');
const { getClosestObj, capitalizeFirstLetter, randomInt } = require('../components/utils');
const objectsInSpace = require('../constants/objectsInSpace');
const ship = require('./Ship');

const drone = (initName) => {
  const MAXCHARGE = 100;
  const inventory = [];
  let name = initName;
  let domEl;
  let deployed = false;
  let CPUcount = 2;
  const getInventory = () => { return inventory };

  let charge = MAXCHARGE;
  const getCharge = () => { return charge };

  const getDomEl = () => { return domEl };
  const setDomEl = (el) => {
    domEl = el;
  }
  const updateDomEl = () => {
    domEl.querySelector('.drone-name').textContent = capitalizeFirstLetter(getName());
    domEl.querySelector('.drone-charge').textContent = getCharge();
  }

  const changeCharge = (ammount) => {
    if ((charge + ammount) < 0) {
      charge = 0;
      returnHome();
    } else if ((charge + ammount) > MAXCHARGE) {
      charge = MAXCHARGE;
    } else {
      charge = charge + ammount;
    }
    updateDomEl();
  }

  let chargingTimer;
  const startCharging = () => {
    console.log('starging charging')
    chargingTimer = setInterval(() => {
      changeCharge(1);
    }, 5000);
  }

  const cancelCharging = () => {
    clearInterval(chargingTimer);
  } 

  const createDroneDomEl = () => {
    const containerEl = document.createElement('div');
    containerEl.classList.add('drone-wrapper');
    
    const nameEl = document.createElement('p');
    nameEl.classList.add('drone-name');
    nameEl.textContent = capitalizeFirstLetter(name);

    const chargeEl = document.createElement('p');
    chargeEl.classList.add('drone-charge');
    chargeEl.textContent = charge;

    containerEl.appendChild(nameEl);
    containerEl.appendChild(chargeEl);
    return containerEl;
  }

  setDomEl(createDroneDomEl());

  let curTargetLootIteration = 0;
  const scanRoom = (target) => {
    console.log('scanning room');
    let loot = target.loot;
    if (!loot[curTargetLootIteration]) {
      curTargetLootIteration++;
      return;
    }
    if (curTargetLootIteration >= loot.length) {
      curTargetLootIteration = 0;
    }
    console.log(`loot iteration: ${curTargetLootIteration}`);
    let chance = loot[curTargetLootIteration].chance;
    if (randomInt(101) < chance) {
      inventory.push(loot[curTargetLootIteration]);
      target.loot[curTargetLootIteration] = null;
      console.log('Looting successful. Inventory:');
      console.log(inventory);
      console.log('Target:')
      console.log(target);
    }
    curTargetLootIteration++;
  }

  const setName = (text) => {
    name = text;
  }

  const getName = () => {
    return name;
  }

  const isDeployed = () => {
    return deployed
  }

  let scanTimer;
  let energyDrainTimer;
  const deploy = () => {
    deployed = true;
    domEl.classList.add('deployed');

    // the check for proximity is already in place at the drone bay
    let target = getClosestObj(ship, objectsInSpace.getAll());
    console.log(objectsInSpace);
    scanTimer = setInterval(() => { scanRoom(target) }, 10000 / CPUcount);

    if (chargingTimer) {
      cancelCharging();
    }
    energyDrainTimer = setInterval(() => {
      // return home on depleted charge is in changeCharge func
      changeCharge(-1);
    }, 1000);
  }

  const returnHome = () => {
    console.log('returning home');
    clearEnergyDrainTimer();
    clearScanTimer();
    startCharging(); 
  }

  const clearEnergyDrainTimer = () => {
    clearInterval(energyDrainTimer);
  }

  const clearScanTimer = () => {
    clearInterval(scanTimer);
  }

  return {
    getCharge,
    getInventory,
    getCharge,
    deploy,
    setName,
    getName,
    getDomEl,
    setDomEl,
    createDroneDomEl,
    isDeployed,
    updateDomEl
  }
};

module.exports = drone;