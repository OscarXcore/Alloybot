/********************
* DJ Stapleton      *
* generateinvite.js *
*********************/

module.exports = function() {
    let meta = {
        name: `invite`,
        desc: `Generates a link to join the bot to other discord servers.${String.newLine}${'Bot Creator Only'.italic()}`,
        sub: {},
        usage: `${'DM Only'.underline()} ${'invite'.prefixed().inlineCode()}`,
        example: 'invite'.prefixed().inlineCode(),
        type: `General`,
        disabled: false,
        reason: null //'For the bot creator only.' 
    }

    musicbot.commands.set(meta.name, main);
    musicbot.meta.set(meta.name, meta);
}

function main(messageEvent) {
    if (messageEvent.channel.type == 'dm' && messageEvent.author.id == process.env.CREATOR_ID) {
        discord.generateInvite(['ADMINISTRATOR']).then(invite => {
            messageEvent.channel.send(`${invite}`);
        })
    } else {
        messageEvent.channel.send(`${'Access Denied'.italic()}. You are either not the creator of the bot, or not sending the command in a DM.`)
    }
}