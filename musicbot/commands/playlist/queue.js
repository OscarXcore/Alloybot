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
    type: lang.type[3],
    disabled: false,
    reason: null
  };

  _musicbot.commands.set(metadata.name, main);
  _musicbot.metadata.set(metadata.name, metadata);
  _musicbot.groups[metadata.type].push(metadata.name);
};

function main(message) {}
