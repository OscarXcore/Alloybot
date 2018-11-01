/***************
 * DJ Stapleton *
 * add.js   *
 ****************/
const lang = _langfiles.get('musicbot');

module.exports = function() {
  let metadata = {
    name: 'add',
    desc: lang.description.add,
    usage: 'add <search words|youtube link>'.prefixed().inlineCode(),
    example: 'add khalid better'.prefixed().inlineCode(),
    type: lang.type[3],
    disabled: false,
    reason: null
  };

  _musicbot.commands.set(metadata.name, main);
  _musicbot.metadata.set(metadata.name, metadata);
  _musicbot.groups[metadata.type].push(metadata.name);
};

function main(message) {
  const YouTube = _connections.get('ytapi');
  const database = _connections.get('database').db;
}
