/***************
 * DJ Stapleton *
 * playlist.js  *
 ****************/
const lang = _langfiles.get('musicbot');

module.exports = function() {
  let metadata = {
    name: 'queue',
    desc: lang.description.queue,
    usage: 'queue'.prefixed().inlineCode(),
    example: 'queue'.prefixed().inlineCode(),
    type: lang.type[1],
    disabled: false,
    reason: null
  };

  _bot.commands.set(metadata.name, main);
  _bot.metadata.set(metadata.name, metadata);
  _bot.groups[metadata.type].push(metadata.name);
};

function main(message) {}
