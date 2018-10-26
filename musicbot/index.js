/******************
 * Shared Objects *
 ******************/

global.musicbot = {
	commands: new Map(),
	meta: new Map(),
	currentTime: Date.now(),
	parsed: {
		prefix: process.env['CMD_PREFIX']
	}
}

/*****************
 * Module Loader *
 *****************/

const path = require('path');
const fs = require('fs');

function loadModules(dir) {
	// Get 'dir' stats
	fs.lstat(dir, function (err, stat) {
		// If 'dir' is a directory
		if (stat.isDirectory()) {
			// Get all files in 'dir'
			let files = fs.readdirSync(dir);
			let f, l = files.length;
			for (let i = 0; i < l; i++) {
				// Join the current directory and each file
				f = path.join(dir, files[i]);
				// Run this function again but with the newly joined file/dir
				loadModules(f);
			}
		// If 'dir' is a file, load it. Also call an init function in the module on load.
		} else {
			require(dir);
		}
	});
}

loadModules(path.join(__dirname, 'commands'));

/*************
 * Bot Stuff *
 *************/
let discord = _connections.get('discord');

discord.client.on('message', function(message) {

	// If the message was created by the bot, return.
	if (message.author.id == discord.client.user.id) return;

	if (message.content != 'invite'.prefixed() && message.channel.type == 'dm') return;
	if (message.content == 'invite'.prefixed() && message.channel.type == 'dm') musicbot.commands.get('invite')(message);

	// Apply some RichEmbed defaults to the core object.
	if (message.guild) {
		if (!discord.embed.thumbnail || (discord.embed.thumbnail != message.guild.iconURL)) discord.embed.thumbnail = {
			url: message.guild.iconURL
		};

		// Parse message content.
		let parsing = message.content.toLowerCase().split(' ');
		musicbot.parsed.clean = parsing.shift().replace(musicbot.parsed.prefix, '');
		musicbot.parsed.subargs = parsing.slice();
		musicbot.parsed.sub = parsing.shift();
		musicbot.parsed.arguments = parsing;

		// If the message starts with the command prefix set in private.env and the core object has the command being called;
		// Then get the command module and run it.
		if (message.content.startsWith(musicbot.parsed.prefix)) {
			let sub = musicbot.parsed.sub,
			clean = musicbot.parsed.clean;

			if (musicbot.commands.has(musicbot.parsed.clean) && !musicbot.meta.get(musicbot.parsed.clean).disabled) {

				if (musicbot.parsed.sub == 'undefined' && !musicbot.meta.has(musicbot.parsed.sub))
					message.channel.send(`Subcommand ${sub.inlineCode()} does not exist under command ${clean.inlineCode()}`);

				else if (musicbot.meta.get(musicbot.parsed.clean).sub[musicbot.parsed.sub] && musicbot.meta.get(musicbot.parsed.clean).sub[musicbot.parsed.sub].disabled)
					message.channel.send(`The subcommand ${sub.inlineCode()} under command ${clean.inlineCode()} is disabled.`);

				else musicbot.commands.get(musicbot.parsed.clean)(message);

			} else if (!musicbot.commands.has(musicbot.parsed.clean)) {
				
				message.channel.send(`Command ${clean.inlineCode()} does not exist. Do ${'cmdlist'.prefixed().inlineCode()} for a list of available commands.`);

			} else if (musicbot.commands.has(musicbot.parsed.clean) && musicbot.meta.get(musicbot.parsed.clean).disabled) {

				message.channel.send(`Command ${clean.inlineCode()} is disabled. Do ${`${'help'.prefixed()} <here|dm> `.inlineCode()}${clean.inlineCode()} for more info.`);
				
			}
		}
	}
});

//process.send('Musicbot: Connected.');