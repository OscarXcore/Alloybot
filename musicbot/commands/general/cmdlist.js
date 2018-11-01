/***************
 * DJ Stapleton *
 * cmdlist.js   *
 ****************/
const lang = _langfiles.get('musicbot');

module.exports = function() {
  let metadata = {
    name: 'cmdlist',
    desc: lang.description.cmdlist,
    usage: 'cmdlist'.prefixed().inlineCode(),
    example: 'cmdlist'.prefixed().inlineCode(),
    type: lang.type[0],
    disabled: false,
    reason: null
  };

  _musicbot.commands.set(metadata.name, main);
  _musicbot.metadata.set(metadata.name, metadata);
  _musicbot.groups[metadata.type].push(metadata.name);
};

function main(message) {
  let embed = _connections.get('discord').embed();

  Object.keys(_musicbot.groups).forEach((group) => {
    if (_musicbot.groups[group].length > 0)
      embed.addField(group, _musicbot.groups[group].join(', '));
    else embed.addField(group, lang.label.empty);
  });

  message.channel.send(embed.setTimestamp());
}
