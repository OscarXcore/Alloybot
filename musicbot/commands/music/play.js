/***************
* DJ Stapleton *
* play.js   *
****************/

module.exports = function() {
    let metadata = {
        name: `play`,
        desc: `Starts playing the first song in the queue. If there is a youtube link or search words after the command, it will play what it finds, before the queue.`,
        sub: {},
        usage: `play <search words|youtube link>`.prefixed().inlineCode(),
        example: `play sick boy the chainsmokers`.prefixed().inlineCode(),
        type: `Music`,
        disabled: false,
        reason: null
    }

    _musicbot.commands.set(metadata.name, main);
    _musicbot.metadata.set(metadata.name, metadata);
    _musicbot.groups[metadata.type].push(metadata.name);
}

function main(messageEvent) {
    
}