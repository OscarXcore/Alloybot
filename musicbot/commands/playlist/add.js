/***************
* DJ Stapleton *
* add.js   *
****************/

module.exports = function() {
    let metadata = {
        name: `add`,
        desc: `Finds the first video returned from using the search words or link and adds it to the end of the queue.`,
        sub: {},
        usage: `add <search words|youtube link>`.prefixed().inlineCode(),
        example: `add sick boy the chainsmokers`.prefixed().inlineCode(),
        type: `Playlist`,
        disabled: false,
        reason: null
    }

    _musicbot.commands.set(metadata.name, main);
    _musicbot.metadata.set(metadata.name, metadata);
    _musicbot.groups[metadata.type].push(metadata.name);
}

/*const queue = mongoose.Schema({
    guild: Number,
    requestedBy: Number,
    title: String,
    duration: Number,
    videoid: String,
    thumbnail: String,
    related: Array
});

const queueModel = mongoose.model('queue', queue);*/

function main(messageEvent) {
    let ytapi = connections.get('ytapi');
    let queueItem = new queueModel({ 
        guild: messageEvent.guild.id,
        requestedBy: messageEvent.author.id
    });

    if (_musicbot.parsed.subargs.length > 1) search(messageEvent, _musicbot.parsed.subargs.join(' '));
    else getVideo(messageEvent, _musicbot.parsed.subargs);
}

function search(messageEvent, query) {
    ytapi.search(query, 5).then(results => {
        //messageEvent.channel.send(`Results: ${results[0].raw.id.videoId}`);
        //console.log(results[0]);
        getVideo(messageEvent, results[0].raw.id.videoId.toString());
    }).catch(console.error);
}

function getVideo(messageEvent, link) {
    if (typeof link != 'string') messageEvent.channel.send(`Please provide either a YouTube link or something to search YouTube for.`);

    const ytdl = require('ytdl-core');
    ytdl.getInfo(link, (error, info) => {
        if (error) messageEvent.channel.send(`Failed to get video info.${String.newLine}${error}`);

        let item = {
            guild: messageEvent.guild.id,
            requestedBy: messageEvent.author.id,
            title: info.title,
            duration: info.length_seconds / 60,
            videoid: info.video_id,
            thumbnail: info.thumbnail_url,
            related: info.related_videos
        }

        queueModel.create(item, (error, item) => {
            if (error) logger.error(`Failed to create document. ${error}`);
        });
    });
}