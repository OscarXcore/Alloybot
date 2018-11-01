const Discord = require('discord.js');

global._musicbot = {
    commands: new Map(),
    metadata: new Map(),
    prefix: process.env["CMD_PREFIX"],
	groups: {
		General: [],
		Music: [],
		Other: [],
		Playlist: [],
		Voice: []
	},
	permissions: new Discord.Permissions(103927104)
}

_langfiles.set('musicbot', require('./lib/lang.json'));
_loader(require('path').join(__dirname, "commands"));
_connections.get('database').promise.then(() => {
	require('./lib/cycleDb');
});

/*************
 * Bot Stuff *
 *************/
const discord = _connections.get("discord");

discord.client.on("message", message => {
    if (message.content.startsWith(_musicbot.prefix)) onMessage(message);
});

function onMessage(message) {
    if (message.author.id == discord.client.user.id) return;

    _musicbot.split = message.content.split(" ");
    _musicbot.command = message.content.split(" ").shift().replace(global._symbols, "");

	switch(message.channel.type) {
		case "dm":
			discord.embed.thumbnail = message.recipient.displayAvatarURL
			break;
		case "voice" || "category":
			break;
		default:
			discord.embed.thumbnail = message.guild.iconURL
	}

    try { _musicbot.commands.get(_musicbot.command)(message) } 
    catch (error) {
        message.channel.send(lang.noCommand.format(_musicbot.command.inlineCode(), "cmdlist".prefixed().inlineCode()));
    }
}