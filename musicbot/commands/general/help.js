/***************
* DJ Stapleton *
* help.js      *
****************/

module.exports = function() {
    let meta = {
        name: `help`,
        desc: `Gets more info on any listed command.`,
        sub: {
            here: {
                name: `here`,
                desc: `Posts the message in the current channel.`,
                usage: `help here <command> <subcommand>`.prefixed().inlineCode()
            },
            dm: {
                name: `dm`,
                desc: `Posts the message in the users' direct messages.`,
                usage: `help dm <command> <subcommand>`.prefixed().inlineCode()
            }
        },
        usage: `help <dm|here> <command> <subcommand>`.prefixed().inlineCode(),
        example: `help dm join`.prefixed().inlineCode(),
        type: `General`
    }

    musicbot.commands.set(meta.name, main);
    musicbot.meta.set(meta.name, meta);
}

function main(messageEvent) {
    let helpForCommand, commeta, finalEmbed;

    if (musicbot.parsed.arguments[1]) helpForCommand = {
        base: musicbot.parsed.arguments[0],
        sub: musicbot.parsed.arguments[1]
    };
    else helpForCommand = musicbot.parsed.arguments[0];

    if (typeof helpForCommand == 'object') finalEmbed = buildHelpEmbed(helpForCommand, embed, true);
    else finalEmbed = buildHelpEmbed(helpForCommand, embed);

    switch (musicbot.parsed.sub) {
        case 'dm':
            if (!finalEmbed.error) utils.messageDMChannel(messageEvent, finalEmbed);
            else noCommand(messageEvent, finalEmbed.isSub);
            break;
        case 'here':
            if (!finalEmbed.error) messageEvent.channel.send(finalEmbed);
            else noCommand(messageEvent, finalEmbed.isSub);
            break;
        default:
            messageEvent.channel.send(`Where should I send it? Put either ${'dm'.inlineCode()} or ${'here'.inlineCode()} after the ${'help'.prefixed().inlineCode()}`);
    }
}

function buildHelpEmbed(commandName = 'help', helpEmbed, isSub = false) {
    switch (isSub) {
        case false:
            commeta = musicbot.meta.get(commandName);

            if (!musicbot.meta.has(commandName)) return {
                error: true,
                isSub: false
            };
            else {
                helpEmbed.author = {
                    name: `Command Info - ${commeta.name}`
                };
                helpEmbed.description = commeta.desc;
                helpEmbed.fields[0] = {
                    name: `Usage`,
                    value: `${commeta.usage}`,
                    inline: false
                };
                helpEmbed.fields[1] = {
                    name: `Example`,
                    value: `${commeta.example}`,
                    inline: false
                };
                helpEmbed.fields[2] = {
                    name: `Command Type`,
                    value: commeta.type,
                    inline: true
                };
            
                if (!commeta.disabled) helpEmbed.fields[3] = {
                    name: `Enabled?`,
                    value: `:white_check_mark:`,
                    inline: true
                };
                else if (commandName == 'help' || 'cmdlist') helpEmbed.fields[3] = {
                    name: `Enabled?`,
                    value: `:White_check_mark:`,
                    inline: true
                };
                else {
                    helpEmbed.fields[3] = {
                        name: `Enabled?`,
                        value: `:negative_squared_cross_mark:`,
                        inline: true
                    };
                    helpEmbed.fields[4] = {
                        name: `Reason for being disabled`,
                        value: commeta.reason ? commeta.reason : `Not Available.`,
                        inline: false
                    };
                }
                
                if (Object.keys(commeta.sub).length > 0) {
                    helpEmbed.fields[4] = {
                        name: `Subcommands`,
                        value: Object.keys(commeta.sub).join(', '),
                        inline: false
                    }
                }
                
                return helpEmbed;
            }
            break;

        case true:
            commeta = musicbot.meta.get(commandName.base);
            let submeta = commeta.sub[commandName.sub];

            if (!commeta.sub[commandName.sub]) noCommand(messageEvent, true);
            else if (!musicbot.meta.has(commandName.base)) return {
                error: true,
                isSub: true
            };
            else {
                helpEmbed.author = {
                    name: `Subcommand Info - ${submeta.name}`
                };
                helpEmbed.description = submeta.desc;
                helpEmbed.fields[0] = {
                    name: `Usage`,
                    value: `\`${submeta.usage}\``,
                    inline: true
                };

                if (!submeta.disabled) helpEmbed.fields[1] = {
                    name: `Enabled?`,
                    value: `:white_check_mark:`,
                    inline: true
                };
                else {
                    helpEmbed.fields[1] = {
                        name: `Enabled?`,
                        value: `:negative_squared_cross_mark:`,
                        inline: true
                    };
                    helpEmbed.fields[2] = {
                        name: `Reason for being disabled`,
                        value: submeta.reason ? submeta.reason : `Not Available.`,
                        inline: false
                    };
                }

                return helpEmbed;
            }
            break;

        default:
            helpEmbed.author = {
                name: `Unavailable`
            };
            isSub ? 
            helpEmbed.description = `Subcommand ${commandName.sub.inlineCode()} does not exist under command ${commandName.base.inlineCode()}.`:
            helpEmbed.description = `Command ${commandName.inlineCode()} does not exist.`;
            
            return helpEmbed;
    }
}

function noCommand(messageEvent, isSub = false) {
    if (!isSub) messageEvent.channel.send(`Command ${musicbot.parsed.arguments[0].inlineCode()} does not exist.`);
    else messageEvent.channel.send(`Subcommand ${musicbot.parsed.arguments[1].inlineCode()} does not exist under command ${musicbot.parsed.arguments[0].inlineCode()}.`)
}