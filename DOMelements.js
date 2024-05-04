const turnLeftButton = document.getElementById("turnLeftButton");
const turnRightButton = document.getElementById("turnRightButton");
const shipDirectionPointer = document.getElementById("shipDirectionPointer");
const shipDirectionValueHud = document.getElementById("shipDirectionValue");
const engineOnButton = document.getElementById('engineOnButton');
const engineOffButton = document.getElementById('engineOffButton');
// const canvas = document.getElementById('canvas');
const shipVelocityHud = document.getElementById('shipVelocity');
const scaleRadarDownButton = document.getElementById('scaleRadarDown');
const scaleRadarUpButton = document.getElementById('scaleRadarUp');
const scaleValueText = document.getElementById('scaleValueText');
const shipCoordinatesXHud = document.getElementById('shipCoordinateX');
const shipCoordinatesYHud = document.getElementById('shipCoordinateY');
const toggleVODButton = document.getElementById('toggleVODButton');
const toggleRCDButton = document.getElementById('toggleRCDButton');
const increaseRCDButton = document.getElementById('increaseRCDButton');
const decreaseRCDButton = document.getElementById('decreaseRCDButton');
const RCDvalueText = document.getElementById('RCDvalueText');
const increaseVCapButton = document.getElementById('increaseVCapButton');
const decreaseVCapButton = document.getElementById('decreaseVCapButton');
const VODhud = document.getElementById('VOD');
const VODvalueText = document.getElementById('VODvalueText');
const velocityCapHud = document.getElementById('velocityCap');
const terminalInput = document.getElementById('terminalInput');
const terminalOutput = document.getElementById('terminalOutput');
let astrotrackerDisplay = document.getElementById('astrotrackerDisplay');
const astrotrackerContainer = document.getElementById('astrotrackerContainer');
const sortDistanceTrackerButton = document.getElementById('sortDistanceTrackerButton');
const shipCargoDisplay = document.getElementById('shipCargoDisplay');
const droneCargoDisplay = document.getElementById('droneCargoDisplay');
const dronesDisplay = document.getElementById('dronesDisplay');

module.exports = {
  turnLeftButton,
  turnRightButton,
  shipDirectionPointer,
  shipDirectionValueHud,
  engineOnButton,
  engineOffButton,
  canvas,
  shipVelocityHud,
  scaleRadarDownButton,
  scaleRadarUpButton,
  scaleValueText,
  shipCoordinatesXHud,
  shipCoordinatesYHud,
  toggleVODButton,
  toggleRCDButton,
  increaseRCDButton,
  decreaseRCDButton,
  RCDvalueText,
  increaseVCapButton,
  decreaseVCapButton,
  VODhud,
  VODvalueText,
  velocityCapHud,
  terminalInput,
  terminalOutput,
  astrotrackerDisplay,
  astrotrackerContainer,
  sortDistanceTrackerButton,
  shipCargoDisplay,
  droneCargoDisplay,
  dronesDisplay
}