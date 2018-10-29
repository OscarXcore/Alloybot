/***************
* DJ Stapleton *
* playlist.js  *
****************/

module.exports = function() {
    let metadata = {
        name: `playlist`,
        desc: `Lists everything in the playlist for the current server.`,
        sub: {},
        usage: 'playlist'.prefixed().inlineCode(),
        example: 'playlist'.prefixed().inlineCode(),
        type: `Playlist`,
        disabled: false,
        reason: null
    }

    _musicbot.commands.set(metadata.name, main);
    _musicbot.metadata.set(metadata.name, metadata);
    _musicbot.groups[metadata.type].push(metadata.name);
}

function main(messageEvent) {
    
}