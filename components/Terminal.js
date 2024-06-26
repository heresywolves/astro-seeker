const { terminalOutput } = require('../DOMelements.js');
const astrotracker = require('./Astrotracker');
const dronebay = require('./DroneBay.js');

const terminal = (function() {
  const commandHistory = [];
  let historyIndex = 0;

  const clearLastOutput = () => {
    terminalOutput.lastChild.remove();
  }

  const getPastCommand  = () => {
    if (commandHistory.length === 0) return "";
    if (historyIndex > 0) historyIndex -= 1;
    let command = commandHistory[historyIndex];
    return command;
  }

  const printOutLoading = async (interval) => {
      return new Promise((resolve) => {
          let loadingStr = "[#-------------------]";
          terminal.printOut(loadingStr);
          const timer = setInterval(() => {
              terminal.clearLastOutput();
              if (loadingStr.includes('-')) {
                  loadingStr = loadingStr.replace('-', '#');
                  terminal.printOut(loadingStr);
              } else {
                  clearInterval(timer);
                  resolve(true); // Resolve the promise when loading is complete
              }
          }, interval);
      });
  };

  const getRecentCommand = () => {
    if (!commandHistory[historyIndex + 1]) return "";
    historyIndex += 1;
    let command = commandHistory[historyIndex];
    return command;
  }

  const runHelp = () => {
    printOut(`Here is a list of available commands:
      scan - Perform a scan of the sector and send results to the Astrotracker.
      scan [subject] - Deepscan of the subject specified.`)
  }

  const runTrackerScan = (subject) => {
    astrotracker.scan(subject);
  }

  const sendCommand = (command) => {
    commandHistory.push(command);
    historyIndex = commandHistory.length;
    words = command.split(' ');

    switch (words[0]) {
      case 'help':
        runHelp();
        break;
      case 'scan':
        // if there are arguments passed to the scan
        if (words.length > 1 && words[1] != "") {
          runTrackerScan(words[1]);
        } else {
          printOut(`Scanning complete. Results sent to the Astrotracker`)
          runTrackerScan();
        }
        break;
      case 'drone':
        if (words[1] === 'deploy' && !words[2]) {
          printOut(`Please specify the drones for deployment: 
          drone deploy [name]`);
        } else if (words[1] === 'deploy' && words[2]) {
          let droneName = words[2];
          let deploymentMessage = dronebay.deploy(droneName);
            printOut(deploymentMessage);
        } else if (words[1] === 'return' && !words[2]) {
          printOut(`Please specify the drones to return: 
          drone return [name]`);
        } else if (words[1] === 'return' && words[2]) {
          let droneName = words[2];
          let returnMessage = dronebay.returnDrone(droneName);
          printOut(returnMessage);
        }
        break;
      default:
        printOut(`Error - Command "${command}" does not exist
        To see a list of available commands type "help"`);
    }
  }

  const printOut = (text, centered) => {
    const outputEl = document.createElement('p');
    outputEl.classList.add('terminal-output');
    if (centered) {
      outputEl.classList.add('centered-text');
    }
    // Split the text into two parts where you want the break line
    const parts = text.split('\n');
    // Append each part as a text node or a break line
    parts.forEach((part, index) => {
        outputEl.innerHTML += part;
        // Add a break line if not the last part
        if (index < parts.length - 1) {
            outputEl.appendChild(document.createElement('br'));
        }
    });
    terminalOutput.appendChild(outputEl);
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
  }

  return {sendCommand, getPastCommand, getRecentCommand, printOut, clearLastOutput, printOutLoading}
})();

module.exports = terminal;