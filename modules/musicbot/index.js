const Discord = require('discord.js');

_langfiles.set('musicbot', require('./lib/lang.json'));
_loader(require('path').join(__dirname, 'commands'));
_connections.get('database').promise.then(() => {
  require('./lib/cycleDb');
});
