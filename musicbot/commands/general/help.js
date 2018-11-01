/***************
* DJ Stapleton *
* help.js      *
****************/
const lang = _langfiles.get('musicbot');

module.exports = function() {
    let metadata = {
        name: "help",
        desc: lang.description.help,
        /*sub: {
            here: {
                desc: "Posts the message in the current channel.",
                usage: "help here <command> <subcommand>".prefixed().inlineCode()
            },
            dm: {
                desc: "Posts the message in the users" direct messages.",
                usage: "help dm <command> <subcommand>".prefixed().inlineCode()
            }
        },*/
        usage: "help <command>".prefixed().inlineCode(),
        example: "help join".prefixed().inlineCode(),
        type: lang.type[0],
        disabled: false,
        reason: null
    }

    _musicbot.commands.set(metadata.name, main);
    _musicbot.metadata.set(metadata.name, metadata);
    _musicbot.groups[metadata.type].push(metadata.name);
}

function main(message) {
    let embed = connections.get("discord").embed(), metadata;

    try { metadata = _musicbot.metadata.get(_musicbot.command) } 
    catch (error) { 
        message.channel.send(lang.noInfo.format(_musicbot.command.inlineCode()));
    }

    metadata.sub
    ? () => {
        Object.keys(metadata.sub).forEach(subcommand => {
            _musicbot.split[1] == subcommand
            ? () => {
                embed.setFooter(lang.label.subcommandInfo.format(subcommand));
                embed.setDescription(metadata.sub[subcommand].desc);
                embed.addField(lang.label.usage, metadata.sub[subcommand].usage);
                embed.addField(lang.label.example, metadata.sub[subcommand].example);
                
                metadata.sub[sub].disabled == false
                ? embed.addField(lang.label.enabled, lang.symbol.enabled, true)
                : () => { 
                    embed.addField(lang.label.enabled, lang.symbol.disabled, true);
                    embed.addField(lang.label.reason, metadata.sub[subcommand].reason ? metadata.sub[subcommand].reason : lang.general.reason);
                }
                
                message.channel.send(embed);
            }
            : () => {
                continue;
            }
        })
    }
    : () => {
        embed.setFooter(lang.label.commandInfo.format(metadata.name));
        embed.setDescription(metadata.desc);
        embed.addField(lang.label.usage, metadata.usage);
        embed.addField(lang.label.example, metadata.example);
        embed.addField(lang.label.type, metadata.type, true);

        metadata.disabled == false
        ? embed.addField(lang.label.enabled, lang.symbol.enabled, true)
        : () => { 
            embed.addField(lang.label.enabled, lang.symbol.disabled, true);
            embed.addField(lang.label.reason, metadata.reason ? metadata.reason : lang.general.reason);
        }

        if (metadata.sub) embed.addField(lang.label.subcommand, Object.keys(metadata.sub).join(", "));

        message.channel.send(embed);
    }
}