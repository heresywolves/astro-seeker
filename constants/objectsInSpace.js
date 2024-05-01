const objectsInSpace = (() => {
  const all = [];

  const getAll = () => { return all };
  const add = (obj) => { all.push(obj) }

  return {getAll, add, all}
})();

module.exports = objectsInSpace

// This is called after the export because the utils needs to reference this object when created
const { randomInt, constructObjectName, reverseString } = require('../components/utils');

const lowSecTypes = {
  small: [
    {
      type: "Scavenger Ship",
      description: "A small spacecraft equipped for salvaging materials from space debris or abandoned ships."
    },
    {
      type: "Courier Drone",
      description: "Autonomous drones used for delivering small packages or messages between spacecraft or space stations."
    },
    {
      type: "Probe",
      description: "Small unmanned spacecraft designed to explore space, gather data, or perform scientific experiments."
    },
    {
      type: "Mining Drone",
      description: "Automated drones used for extracting valuable minerals or resources from asteroids or planetary surfaces."
    },
    {
      type: "Transport Shuttle",
      description: "Small spacecraft designed for transporting passengers or cargo between planets, moons, or space stations."
    },
    {
      type: "Repair Drone",
      description: "Small drones equipped with repair tools for performing maintenance or repairs on spacecraft or space stations."
    },
    {
      type: "Space Tug",
      description: "Small spacecraft used for towing larger objects or spacecraft, maneuvering payloads into position, or assisting with docking maneuvers."
    }
  ],
  medium: [
    {
      type: "Space Station",
      description: "A medium-sized space station equipped with living quarters, research facilities, and docking bays for smaller spacecraft."
    },
    {
      type: "Asteroid Mining Facility",
      description: "A medium-scale mining operation HQ"
    },
    {
      type: "Cargo Transport Ship",
      description: "A medium-sized freighter designed for transporting goods and materials across space, equipped with loading bays and cargo holds."
    },
    {
      type: "Terraforming Platform",
      description: "A medium-scale platform equipped with terraforming technology, intended to modify the atmosphere and surface conditions of a planet or moon to make it habitable."
    },
    {
      type: "Interstellar Waystation",
      description: "A medium-sized outpost located along major space routes, providing refueling, repair, and rest facilities for long-distance spacecraft."
    },
    {
      type: "Salvage Yard",
      description: "A medium-sized space facility dedicated to salvaging and recycling derelict spacecraft and space debris, extracting valuable materials for reuse or resale."
    },
    {
      type: "Exploration Vessel",
      description: "These spacecraft are tasked with exploring unknown regions of space, often venturing into uncharted territories or hostile environments. They are equipped with advanced sensors, long-range communication systems, and defensive measures to ensure the safety of their crew and the success of their mission."
    }
  ],
  large: [
    {
      type: "Spaceport",
      description: "Major hub for interstellar travel and commerce, where ships come and go regularly to transport passengers and cargo."
    },
    {
      type: "Space Ferry",
      description:"Large vessel designed to transport passengers and vehicles between planets or moons within a star system. "
    },
    {
      type: "Space structure under construction",
      description: "Large engineering project that has not been completed."
    }
  ]
}

const mediumSecTypes = {
  small: [
    {
      type: "Interceptor",
      description: "Fast and agile spacecraft designed for intercepting and engaging enemy ships or intercepting incoming threats."
    },
  ],
  medium: [
    {
      type: "Research Vessel",
      description: "A medium-sized spacecraft outfitted with laboratories and scientific equipment for exploring cosmic phenomena and conducting experiments."
    }
  ],
  large: [
    {
      type: "Large Cargo Freighter",
      description: "These large transport ships carry valuable cargo such as precious metals, rare minerals, or high-tech equipment across space."
    }
  ]
}

const highSecTypes = {
  small: [
    {
      type: "Spy Satellite",
      description: "Small satellites equipped with surveillance equipment for reconnaissance and intelligence gathering."
    },
    {
      type: "Diplomatic Ship",
      description: "Used by diplomats and ambassadors to travel between planets and negotiate treaties or trade agreements, these vessels are considered sovereign territory and enjoy diplomatic immunity. They are heavily guarded to protect the diplomats onboard and ensure their safe passage through space."
    }
  ],
  medium: [
    {
      type: "Prison Transport Ship",
      description: "Used to transport dangerous criminals or prisoners of war through space, these vessels are equipped with reinforced cells, automated defense systems, and a large security force to prevent escapes."
    },
    {
      type: "VIP Transport Ship",
      description: "These luxury spacecraft are designed to transport high-profile individuals such as government officials, corporate executives, or celebrities. They feature advanced security measures including armed guards, encryption protocols, and secure communication systems to protect their passengers."
    }, 
    {
      type: "Interstellar Bank",
      description: "Space banks serve as secure repositories for wealth and valuable assets. They are equipped with advanced security systems including biometric scanners, laser grids, and robotic guards to protect their clients' assets from theft or fraud."
    }
  ],
  large: [
    {
      type: "Space Fortress",
      description: "These massive fortified structures serve as military outposts or command centers in strategic locations throughout the galaxy. They are equipped with powerful defensive systems including energy shields, missile batteries, and automated turrets to repel enemy attacks."
    }
  ]
}

function generateObjectDiagram() {
  availableSymbols = ["|", "-", "."];
  resultStr = `\n`;
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
      for (let i = 0; i < MAXROWSYMBOLS/2 - numOfSpaces; i++) {
        line = line + randSymbol;
      }
      resultStr = resultStr + line + reverseString(line) + "\n";
    } 
    
    else {
      numOfSpaces += randomInt(3) - 1;
      let randSymbol = availableSymbols[randomInt(availableSymbols.length)];
      // -1 is needed here because otherwise it creates too much symbols
      for (let i = 0; i < numOfSpaces - 1; i++) {
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
  let typeObj;

  for (let i = 0; i < totalLowLvlObjects; i++) {
    let randRadius = randomInt(55) + 5;
    if (randRadius <= 20) {
      typeObj = lowSecTypes.small[randomInt(lowSecTypes.small.length)];
    } else if (randRadius <= 35) {
      typeObj = lowSecTypes.medium[randomInt(lowSecTypes.medium.length)];
    } else {
      typeObj = lowSecTypes.large[randomInt(lowSecTypes.large.length)];
    }
    objectsInSpace.add({
      x: randomInt(4000) - 2000,
      y: randomInt(4000) - 2000,
      radius: randRadius,
      name: constructObjectName(count),
      lvl: 'low',
      publicLvl: '????',
      diagram: generateObjectDiagram(),
      type: typeObj.type,
      description: typeObj.description,
    })
    count++;
  }
  for (let i = 0; i < totalMediumLvlObjects; i++) {
    let randRadius = randomInt(55) + 5;
    if (randRadius <= 20) {
      typeObj = mediumSecTypes.small[randomInt(mediumSecTypes.small.length)];
    } else if (randRadius <= 35) {
      typeObj = mediumSecTypes.medium[randomInt(mediumSecTypes.medium.length)];
    } else {
      typeObj = mediumSecTypes.large[randomInt(mediumSecTypes.large.length)];
    }
    objectsInSpace.add({
      //50% of being a negative value
      x: (randomInt(2)) ? randomInt(2000) + 1000 : -(randomInt(2000) + 1000),
      y: (randomInt(2)) ? randomInt(2000) + 1000 : -(randomInt(2000) + 1000),
      radius: randRadius,
      name: constructObjectName(count),
      lvl: 'medium',
      publicLvl: '????',
      diagram: generateObjectDiagram(),
      type: typeObj.type,
      description: typeObj.description,
    })
    count++;
  }
  for (let i = 0; i < totalHighLvlObjects; i++) {
    let randRadius = randomInt(55) + 5;
    if (randRadius <= 20) {
      typeObj = highSecTypes.small[randomInt(highSecTypes.small.length)];
    } else if (randRadius <= 35) {
      typeObj = highSecTypes.medium[randomInt(highSecTypes.medium.length)];
    } else {
      typeObj = highSecTypes.large[randomInt(highSecTypes.large.length)];
    }
    objectsInSpace.add({
      x: (randomInt(2)) ? randomInt(4000) + 2000 : -(randomInt(4000) + 2000),
      y: (randomInt(2)) ? randomInt(4000) + 2000 : -(randomInt(4000) + 2000),
      radius: randRadius,
      name: constructObjectName(count),
      lvl: 'high',
      publicLvl: '????',
      diagram: generateObjectDiagram(),
      type: typeObj.type,
      description: typeObj.description,
    })
    count++;
  }
}

generateObjectsInSpace();
console.log(objectsInSpace);


