global._musicbot = {
    commands: new Map(),
    metadata: new Map(),
    prefix: process.env['CMD_PREFIX'],
	groups: {
		General: [],
		Music: [],
		Other: [],
		Playlist: [],
		Voice: []
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
			require(dir)();
		}
	});
}

loadModules(path.join(__dirname, 'commands'));

/*************
 * Bot Stuff *
 *************/
const discord = _connections.get('discord');
discord.client.on('message', message => {
    if (message.content.startsWith(_musicbot.prefix)) onMessage(message);
});

function onMessage(message) {
    if (message.author.id == discord.client.user.id) return;

    _musicbot.split = message.content.split(' ');
    _musicbot.command = message.content.split(' ').shift().replace(global._symbols, '');

	switch(message.channel.type) {
		case 'dm':
			discord.embed.thumbnail = message.recipient.displayAvatarURL
			break;
		case 'voice' || 'category':
			break;
		default:
			discord.embed.thumbnail = message.guild.iconURL
	}

    try { _musicbot.commands.get(_musicbot.command)(message) } 
    catch (error) {
        message.channel.send(`Command ${_musicbot.command.inlineCode()} doesn\'t exist. For a list of available commands, do ${'cmdlist'.prefixed().inlineCode()}.`);
    }
}