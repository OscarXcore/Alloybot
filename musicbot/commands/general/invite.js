/********************
 * DJ Stapleton      *
 * generateinvite.js *
 *********************/
const lang = _langfiles.get('musicbot');

module.exports = function() {
  let metadata = {
    name: 'invite',
    desc: lang.description.invite,
    usage: 'invite'.prefixed().inlineCode(),
    example: 'invite'.prefixed().inlineCode(),
    type: lang.type[0],
    disabled: false,
    reason: null //"For the bot creator only."
  };

  _musicbot.commands.set(metadata.name, main);
  _musicbot.metadata.set(metadata.name, metadata);
  _musicbot.groups[metadata.type].push(metadata.name);
};

function main(message) {
  connections
    .get('discord')
    .client.generateInvite(_musicbot.permissions)
    .then((invite) => {
      message.channel.send('%s'.format(invite));
    })
    .catch((error) => {
      message.channel.send(lang.general.errorBlock.format(error));
    });
}
