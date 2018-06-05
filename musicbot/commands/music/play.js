/***************
* DJ Stapleton *
* play.js   *
****************/
let meta;

module.exports = function() {
    meta = {
        name: `play`,
        desc: `Starts playing the first song in the queue. If there is a youtube link or search words after the command, it will play what it finds, before the queue.`,
        sub: {},
        usage: `play <search words|youtube link>`.prefixed().inlineCode(),
        example: `play sick boy the chainsmokers`.prefixed().inlineCode(),
        type: `Music`,
        disabled: false,
        reason: null
    }

    musicbot.commands.set(meta.name, main);
    musicbot.meta.set(meta.name, meta);
}

function main(messageEvent) {
    
}