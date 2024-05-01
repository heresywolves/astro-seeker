const { clearCanvas, drawCircle } = require('./utils');
const objectsInSpace = require('../constants/objectsInSpace');
const ship = require('./Ship');
// const { canvas } = require('../DOMelements.js');

const canvas = document.getElementById('canvas');

//setup canvas
const context = canvas.getContext('2d');
canvas.width = 400;
canvas.height = 400;

const radar = (() => {
  let VODisOn = true;
  let RCDisOn = true;
  let maxRCD = 70;
  let RCDradius = 5;
  let radarScale = 1;
  const maxScale = 31;

  const update = () => {
    clearCanvas(context);
    // update object in space
    if (RCDisOn) {
      objectsInSpace.getAll().forEach((object) => {
        drawCircle(
          object.x - ship.x + canvas.width/2, 
          object.y*-1 + ship.y + canvas.width/2, 
          (object.radius > RCDradius) ? object.radius : RCDradius,
          context
          );
      })
    }
  }

  const changeScale = (scaleNum)  =>{
    let temp = radarScale + scaleNum;
    if (temp > 0 && temp < maxScale) {
      radarScale += scaleNum;
      getRadarScale();
    }
    canvas.width = 400 * radarScale;
    canvas.height = 400 * radarScale;
    canvas.style.transform = `scale(${400 / canvas.width})`
    update();
  }

  const getRadarScale = () => {
    return radarScale;
  }

  const getRCDRadius = () => {
    return RCDradius;
  }

  const setRCDRadius = (val) => {
    RCDradius = val;
  }

  const toggleRCD = () => {
    RCDisOn = !RCDisOn;
  }

  const isRCDon = () => {
    return RCDisOn;
  }

  return {update, changeScale, getRadarScale, getRCDRadius, setRCDRadius, toggleRCD, isRCDon,  maxRCD, VODisOn}
})();

module.exports = radar;