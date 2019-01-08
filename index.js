let exec = require('child_process').exec;
let chokidar = require('chokidar');
let applescript = require('applescript');
const path = require('path');

function refresh(browser, app) {
  const refreshScript = `
    tell application "${browser}" to activate
    tell application "System Events"
      delay 0
      key code 15 using {command down} # ⌘R/⇧⌘R
    end tell
    tell application "${app}" to activate
  `;
  applescript.execString ( refreshScript );
}

// function parameters
// browser: String of browser you are using
// filepath: String of file path to watch
// port: integer the port number for the server
// app: the main app you are using to switch back (editor you are using)
module.exports = function(browser, filepath, port, app){
  let BROWSER = browser || 'Safari';
  let FILEPATH = filePath || '.';
  let PORT = port || 8000;
  let APP = app || 'atom';

  console.log('Port', PORT);
  console.log('FilePath', FILEPATH);

  // run a python server
  exec(`cd ${FILEPATH};open http://localhost:${PORT};python -m SimpleHTTPServer ${PORT}`, function(stdout, stderr){
    console.log('out', stdout);
    console.log('err', stderr);
  });

  // watch files
  chokidar.watch(`${FILEPATH}`, {ignored: /(^|[\/\\])\../}).on('change', (path) => {
    console.log(`Changed ${path}`);
    refresh(BROWSER, APP);
  });
  //
}
