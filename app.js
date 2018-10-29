global._connections = new Map();
global._options = new Map();
global._symbols = /(\W)/g;
global._utils = {
	messageDMChannel: require('./lib/messageDMChannel')
}

require('dotenv').config({
	path: './private.env'
});
require('./lib/prototypes');
require('./lib/logger');

const simpleyoutubeapi = require('simple-youtube-api');
const discordjs = require('discord.js');
const mongodb = require('mongodb').MongoClient

_connections.set('ytapi', new simpleyoutubeapi(process.env['YOUTUBE_API_KEY']));
_connections.set('database', { promise: mongodb.connect(`mongodb://${process.env['DB_HOST']}`, { useNewUrlParser: true }) });

_connections.set('discord', { client: new discordjs.Client() });
_connections.get('discord').promise = _connections.get('discord').client.login(process.env['DISCORD_TOKEN']);

/******************
 * Event Handling *
 ******************/
let database = _connections.get('database').promise;
let discord = _connections.get('discord');

logger.start({ prefix: '0/1', message: 'DJ Stapleton:', suffix: 'Starting.'});

database.catch(() => {
	logger.error({ prefix: '0/1', message: 'Database:', suffix: 'Failed.' });
});

database.then(client => {
	_connections.get('database').client = client;
	logger.success({ prefix: '1/1', message: 'Database:', suffix: 'Connected.' });
});

discord.promise.then(() => {
    logger.success({ prefix: '1/1', message: 'Discord:', suffix: 'Connected.' });
	logger.info({ prefix: '1/1', message: 'Server Count:', suffix: discord.client.guilds.size.toString() });
	discord.embed = function() {
		let embed = new discordjs.RichEmbed();
		embed.setColor('RANDOM');
		embed.setAuthor(discord.client.user.username, discord.client.user.avatarURL);
		return embed;
	}
});

discord.promise.catch(() => {
	logger.error({ prefix: '0/1', message: 'Discord:', suffix: 'Failed.' });
});

Promise.all([database, discord.promise])
.then(() => {
	logger.complete({ prefix: '1/1', message: 'DJ Stapleton:', suffix: 'Started.'});
}).catch(error => {
	logger.fatal({ prefix: '0/1', message: 'DJ Stapleton:', suffix: `${error} failed to start.`});
});

if (process.env['DEBUG'] == true) {
	discord.client.on('debug', debug => {
		logger.debug({ prefix: 'Discord', message: debug});
	});
}

/***********
 * Modules *
 ***********/
require('./musicbot/index');