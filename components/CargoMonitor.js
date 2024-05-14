const { droneCargoDisplay, shipCargoDisplay } = require("../DOMelements");

const cargomon = (() => {
  const update = (drones) => {
    let nodes = droneCargoDisplay.childNodes
    if (nodes.length > 0) {
      for (let i = 0; i < nodes.length; i++) {
        console.log('removing node ' + i);
        nodes[i].remove();
      }
    }

    console.log(drones);
    // for (let i = 0; i < allDrones.length; i++) {
    //   let drone = allDrones[i];
    //   let loot = drone.getInventory();
    //   for (let j = 0; j < loot.length; j++) {
    //     let item = loot[j];
    //     let itemContainer = document.createElement('div');
    //     itemContainer.classList.add('item-container');
    //     let itemName = document.createElement('p');
    //     itemName.classList.add('item-name');
    //     itemName.textContent = item.name;
    //     let itemImg = document.createElement('img');
    //     itemImg.src = item.image;
    //     itemImg.classList.add('item-img');
    //     itemContainer.appendChild(itemImg);
    //     itemContainer.appendChild(itemName);
    //     droneCargoDisplay.appendChild(itemContainer);
    //   }
    // }
  }

  return {
    update
  }
})();

module.exports = cargomon;
