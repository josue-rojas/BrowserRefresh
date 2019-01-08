let exec = require('child_process').exec;
let chokidar = require('chokidar');
let applescript = require('applescript');
const path = require('path');

module.exports.BrowserRefresh = function(){
  const PORT = process.env.PORT || 8000;
  let filePath = process.argv[2] || '.'
  // console.log(require.main)
  // console.log(path.dirname(require.main.filename));

  // run a python server
  exec(`cd ${filePath};open https://localhost:${PORT};python -m SimpleHTTPServer ${PORT}`, function(stdout, stderr){
    console.log('out', stdout);
    console.log('err', stderr);
  });

  //
  chokidar.watch('${filePath}', {ignored: /(^|[\/\\])\../}).on('change', (path) => {
  });
  //
  function refresh() {
    const refreshScript = `
      tell application "Safari" to activate
      tell application "System Events"
        delay 0
        key code 15 using {command down} # ⌘R/⇧⌘R
      end tell
      tell application "Atom" to activate
    `;
    // #${ focus ? '' : `tell application "${app}" to activate` }
    applescript.execString ( refreshScript );
  }
}
