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
          // format white spaces in the diagram
          let formattedDiagram = object.diagram.replaceAll(' ', '&nbsp;') + "\n";
          terminal.printOut(formattedDiagram, true);
          terminal.printOut(`Type: ${object.type} \n
          Description: ${object.description} \n
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

module.exports = astrotracker;