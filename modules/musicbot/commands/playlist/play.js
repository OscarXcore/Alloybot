/***************
 * DJ Stapleton *
 * play.js   *
 ****************/
const lang = _langfiles.get('musicbot');

module.exports = function() {
  let metadata = {
    name: 'play',
    desc: lang.description.play,
    usage: 'play <search words|youtube link>'.prefixed().inlineCode(),
    example: 'play sick boy the chainsmokers'.prefixed().inlineCode(),
    type: lang.type[1],
    disabled: false,
    reason: null
  };

  _bot.commands.set(metadata.name, main);
  _bot.metadata.set(metadata.name, metadata);
  _bot.groups[metadata.type].push(metadata.name);
};

function main(message) {}
