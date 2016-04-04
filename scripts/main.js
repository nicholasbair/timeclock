import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route } from 'react-router';
import App from './components/App'

const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

var h = require('./')

let mainWindow = null;

app.on('window-all-closed', function() {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('ready', function() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600
  });
  mainWindow.loadURL('file://' + __dirname + '/index.html');
  mainWindow.webContents.openDevTools();
  mainWindow.on('closed', function() {
    mainWindow = null;
  });
});



// Routes

// let routes = (
//   <Router history={createHistory()}>
//     <Route path="/" component={List}/>
//     <Route path="/list/:listId" component={App}/>
//     <Route path="*" component={NotFound}/>
//   </Router>
// );

ReactDOM.render(<App/>, document.getElementById('main'));
