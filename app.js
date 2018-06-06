require('dotenv').config({
	path: './private.env'
});
require('./lib/prototypes.js');

const simpleyoutubeapi = require('simple-youtube-api');
const discordjs = require('discord.js');
const mongoose = require('mongoose').connect(`mongodb://${process.env['DB_USER']}:${process.env['DB_PASS']}@${process.env['DB_HOST']}/${process.env['DB_NAME']}?authSource=${process.env['DB_NAME']}`);

global.connections = new Map();
connections.set('ytapi', new simpleyoutubeapi(process.env['YOUTUBE_API_KEY']));
connections.set('discord', { client: new discordjs.Client(), embed: new discordjs.RichEmbed() });
connections.set('database', mongoose.connection);

connections.get('discord').client.login(process.env['DISCORD_TOKEN']);

global.logger = require('./lib/logger.js');

global.utils = {
	messageDMChannel: require('./lib/messageDMChannel.js')
}

/***********
 * Modules *
 ***********/

/*const musicbot = require('child_process').fork('./musicbot/index.js')
.on('message', message => { LOGGER.master(message); })
.on('exit', (code, signal) => { LOGGER.master(`Musicbot exited. Code: ${code} | Signal: ${signal}`); })
.on('error', error => { LOGGER.master(`Musicbot errored. ${error}`); })
.on('disconnect', () => { LOGGER.master(`Musicbot disconnected.`); });*/
require('./musicbot/index.js');

/******************
 * Event Handling *
 ******************/
let database = connections.get('database');
let discord = connections.get('discord');

database.on('error', error => {
	logger.mongoose(error);
});

database.once('open', () => {
	logger.mongoose(`Connected to database.`);
});

discord.client.on('ready', () => {
	logger.discordjs(`Connected to ${discord.client.guilds.size} servers.`);
	discord.embed.setFooter(discord.client.user.username, discord.client.user.avatarURL);
	discord.embed.setColor('RANDOM');
});

discord.client.on('error', error => {
	logger.discordjs(error);
});

discord.client.on('disconnect', error => {
	logger.discordjs(error);
});

if (process.env['DEBUG'] == true) {
	discord.client.on('debug', debug => {
		logger.discordjs(debug);
	});
}
