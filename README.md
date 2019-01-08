# BrowserRefresh

Script to run a server and watch file changes to refresh

## About

The scripts works as follow: Creates a server using python SimpleHTTPServer. Using [chokidar](https://github.com/paulmillr/chokidar), watches files for changes and when it does change it uses applescript to refresh browser.

This script is what I will usually use for one page website development when I want to write and see the changes as I go. I know there are a lot of missing parts for this script but it is ok with me so far. I will write more to it if I ever need more from it. Check out the todo list to see what I might add or think this script is missing.

## To Use

This uses python SimpleHTTPServer and Apple Scripts (so only for mac).
```bash
# install first in your project using npm
npm install --save-dev git+https://github.com/josuerojasrojas/BrowserRefresh.git
```

And then on your project package.json add to scripts
```json
"watch": "node -e 'require(`BrowserRefresh`)(browser, filepath, port, app);'"
```
>Parameters:
>- browser: String of browser you are using, defaults to 'Safari'
>- filepath: String of file path to watch, defaults to '.'
>- port: integer the port number for the server, defaults to 8000
>- app: the main app you are using to switch back (editor you are using), defaults to 'atom'


Finally on terminal
```bash
npm run watch
```


### Todo
- Add ability to ignore files. (some files are not necessary to watch like Readme.md)
- add ability to check tab is correct one (sometimes we switch the tabs a lot)

# resouces
- [Apple script for refreshing](https://github.com/fabiospampinato/vscode-browser-refresh/blob/master/src/commands.ts)
