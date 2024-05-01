require('./gameSettings.js');
require('./DOMelements.js');
require('./constants/objectsInSpace.js');
require('./components/Astrotracker.js');
const radar = require('./components/Radar.js');
const ship = require('./components/Ship.js');
require('./components/Terminal.js');
require('./listeners.js');


// Initial updates and settings on game start
radar.update();

ship.updateShipDirection();

radar.changeScale(1);