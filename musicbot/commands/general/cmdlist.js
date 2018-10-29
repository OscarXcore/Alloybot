/***************
* DJ Stapleton *
* cmdlist.js   *
****************/

module.exports = function() {
    let metadata = {
        name: `cmdlist`,
        desc: `Lists all registered commands.`,
        usage: `cmdlist`.prefixed().inlineCode(),
        example: `cmdlist`.prefixed().inlineCode(),
        type: `General`,
        disabled: false,
        reason: null
    }

    _musicbot.commands.set(metadata.name, main);
    _musicbot.metadata.set(metadata.name, metadata);
    _musicbot.groups[metadata.type].push(metadata.name);
}

function main(message) {
    let embed = _connections.get('discord').embed();

    Object.keys(_musicbot.groups).forEach(group => {
        if (_musicbot.groups[group].length > 0) embed.addField(group, _musicbot.groups[group].join(', '))
        else embed.addField(group, 'Empty');
    });

    message.channel.send(embed.setTimestamp());
}