let exec = require('child_process').exec;
let chokidar = require('chokidar');
let applescript = require('applescript');
const path = require('path');

function refresh(app) {
  const refreshScript = `
    tell application "Safari" to activate
    tell application "System Events"
      delay 0
      key code 15 using {command down} # ⌘R/⇧⌘R
    end tell
    tell application "${app}" to activate
  `;
  applescript.execString ( refreshScript );
}

// function parameters
// filepath:
module.exports = function(filepath, port, app){
  const PORT = port || 8000;
  let mainApp = app || 'atom';
  let filePath = process.argv[2] || '.'
  console.log('Port', PORT);
  console.log('FilePath', filePath);

  // run a python server
  exec(`cd ${filePath};open http://localhost:${PORT};python -m SimpleHTTPServer ${PORT}`, function(stdout, stderr){
    console.log('out', stdout);
    console.log('err', stderr);
  });

  //
  chokidar.watch(`${filePath}`, {ignored: /(^|[\/\\])\../}).on('change', (path) => {
    console.log(`Changed ${path}`);
    refresh(app);
  });
  //
}
