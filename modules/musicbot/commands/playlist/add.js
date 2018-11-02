/***************
 * DJ Stapleton *
 * add.js   *
 ****************/
const lang = _langfiles.get('musicbot');
const _url = require('url');
const secToMin = require('sec-to-min');

module.exports = function() {
  let metadata = {
    name: 'add',
    desc: lang.description.add,
    usage: 'add <search words|youtube link>'.prefixed().inlineCode(),
    example: 'add khalid better'.prefixed().inlineCode(),
    type: lang.type[1],
    disabled: false,
    reason: null
  };

  _bot.commands.set(metadata.name, main);
  _bot.metadata.set(metadata.name, metadata);
  _bot.groups[metadata.type].push(metadata.name);
};

class Video {
  constructor(url) {
    this.url = url;

    this.parsedURL = _url.parse(url);

    this.options = {
      quality: 'highestaudio',
      filter: 'audio'
    };

    if (this.parsedURL.query.t)
      this.options.begin = secToMin(this.parsedURL.query.t);
  }
}

function main(message) {
  const YouTube = _connections.get('ytapi');
  const database = _connections.get('database').db;
  let collection = database.collection(`guild_${message}`);

  for (i in _bot.split) {
    let item = _bot.split[i];
    try {
      if (YouTube.validateURL(item)) {
      }
    } catch (error) {}
  }
}
