/***************
* DJ Stapleton *
* help.js      *
****************/

module.exports = function() {
    let metadata = {
        name: `help`,
        desc: `Gets more info on any listed command.`,
        /*sub: {
            here: {
                desc: `Posts the message in the current channel.`,
                usage: `help here <command> <subcommand>`.prefixed().inlineCode()
            },
            dm: {
                desc: `Posts the message in the users' direct messages.`,
                usage: `help dm <command> <subcommand>`.prefixed().inlineCode()
            }
        },*/
        usage: `help <command>`.prefixed().inlineCode(),
        example: `help join`.prefixed().inlineCode(),
        type: `General`,
        disabled: false,
        reason: null
    }

    _musicbot.commands.set(metadata.name, main);
    _musicbot.metadata.set(metadata.name, metadata);
    _musicbot.groups[metadata.type].push(metadata.name);
}

function main(message) {
    let embed = connections.get('discord').embed(), metadata;

    try { metadata = _musicbot.metadata.get(_musicbot.command) } 
    catch (error) { 
        message.channel.send(`Unable to get info about ${_musicbot.command.inlineCode()}. Check the spelling, otherwise its probably not a command.`);
    }

    metadata.sub
    ? () => {
        Object.keys(metadata.sub).forEach(subcommand => {
            _musicbot.split[1] == subcommand
            ? () => {
                embed.setFooter(`Subcommand Info - ${subcommand}`);
                embed.setDescription(metadata.sub[subcommand].desc);
                embed.addField('Usage', metadata.sub[subcommand].usage);
                embed.addField('Example', metadata.sub[subcommand].example);
                
                metadata.sub[sub].disabled == false
                ? embed.addField('Enabled?', ':white_check_mark:', true)
                : () => { 
                    embed.addField('Enabled?', ':negative_squared_cross_mark:', true);
                    embed.addField('Reason', metadata.sub[subcommand].reason ? metadata.sub[subcommand].reason : 'Because it is.');
                }
                
                message.channel.send(embed);
            }
            : () => {
                continue;
            }
        })
    }
    : () => {
        embed.setFooter(`Command Info - ${metadata.name}`);
        embed.setDescription(metadata.desc);
        embed.addField('Usage', metadata.usage);
        embed.addField('Example', metadata.example);
        embed.addField('Type', metadata.type, true);

        metadata.disabled == false
        ? embed.addField('Enabled?', ':white_check_mark:', true)
        : () => { 
            embed.addField('Enabled?', ':negative_squared_cross_mark:', true);
            embed.addField('Reason', metadata.reason ? metadata.reason : 'Because it is.');
        }

        if (metadata.sub) embed.addField('Subcommands', Object.keys(metadata.sub).join(', '));

        message.channel.send(embed);
    }
}