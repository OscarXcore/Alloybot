/***************
* DJ Stapleton *
* cmdlist.js   *
****************/

let list = {
    General: [],
    Music: [],
    Other: [],
    Playlist: [],
    Voice: []
};

module.exports = function() {
    let meta = {
        name: `cmdlist`,
        desc: `Lists all registered commands.`,
        sub: {
            here: {
                name: `here`,
                desc: `Posts the message in the current channel.`,
                usage: `cmdlist here`.prefixed().inlineCode(),
                disabled: false,
                reason: null
            },
            dm: {
                name: `dm`,
                desc: `Posts the message in the users' direct messages.`,
                usage: `cmdlist dm`.prefixed().inlineCode(),
                disabled: false,
                reason: null
            }
        },
        usage: `cmdlist <dm|here>`.prefixed().inlineCode(),
        example: `cmdlist dm`.prefixed().inlineCode(),
        type: `General`,
        disabled: false,
        reason: null
    }

    musicbot.commands.set(meta.name, main);
    musicbot.meta.set(meta.name, meta);

    musicbot.meta.forEach(meta => {
        list[meta.type].push(meta.name);
    });
}

function main(messageEvent) {
}