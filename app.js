require('dotenv').config({
	path: './private.env'
});
require('./lib/prototypes.js');

const simpleyoutubeapi = require('simple-youtube-api');
global.ytapi = new simpleyoutubeapi(process.env['YOUTUBE_API_KEY']);

const discordjs = require('discord.js');
global.discord = new discordjs.Client();
global.discord.login(process.env['DISCORD_TOKEN']);
global.embed = new discordjs.RichEmbed();

const mongoose = require('mongoose');
mongoose.connect(`mongodb://${process.env['DB_USER']}:${process.env['DB_PASS']}@${process.env['DB_HOST']}/${process.env['DB_NAME']}?authSource=${process.env['DB_NAME']}`);
global.mongoose = mongoose.connection;

const LOGGER = require('./lib/logger.js');
global.logger = LOGGER;

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

mongoose.connection.on('error', error => {
	logger.mongoose(error);
});

mongoose.connection.once('open', () => {
	logger.mongoose(`Connected to database.`);
});

discord.on('ready', () => {
	logger.discordjs(`Connected to ${discord.guilds.size} servers.`);
	embed.setFooter(discord.user.username, discord.user.avatarURL);
	embed.setColor('RANDOM');
});

discord.on('error', error => {
	logger.discordjs(error);
});

discord.on('disconnect', error => {
	logger.discordjs(error);
});

if (process.env['DEBUG'] == true) {
	discord.on('debug', debug => {
		logger.discordjs(debug);
	});
}
