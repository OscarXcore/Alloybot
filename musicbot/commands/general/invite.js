/********************
* DJ Stapleton      *
* generateinvite.js *
*********************/

module.exports = function() {
    let metadata = {
        name: `invite`,
        desc: `Generates a link to join the bot to other discord servers.${String.newLine}${'Bot Creator Only'.italic()}`,
        usage: `${'DM Only'.underline()} ${'invite'.prefixed().inlineCode()}`,
        example: 'invite'.prefixed().inlineCode(),
        type: `General`,
        disabled: false,
        reason: null //'For the bot creator only.' 
    }

    _musicbot.commands.set(metadata.name, main);
    _musicbot.metadata.set(metadata.name, metadata);
    _musicbot.groups[metadata.type].push(metadata.name);
}

function main(messageEvent) {
    if (messageEvent.channel.type == 'dm' && messageEvent.author.id == process.env.CREATOR_ID) {
        connections.get('discord').client.generateInvite(['ADMINISTRATOR']).then(invite => {
            messageEvent.channel.send(`${invite}`);
        })
    } else {
        messageEvent.channel.send(`${'Access Denied'.italic()}. You are either not the creator of the bot, or not sending the command in a DM.`)
    }
}