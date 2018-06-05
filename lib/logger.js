const chalk = require('chalk');

var tracer = require('tracer').colorConsole({
    methods: ['master', 'mongoose', 'discordjs', 'debug', 'general'],
    filters: [{
        master: chalk.white,
        mongoose: chalk.magenta,
        discordjs: chalk.cyan,
        debug: chalk.yellow,
        general: chalk.gray
    }],
    format: [
        "[{{title}}] {{message}}",
        {
            debug: "[{{title}}] <{{file}}|{{line}};{{pos}}|{{method}}> {{message}}"
        }
    ]
});

module.exports.master = tracer.master;
module.exports.mongoose = tracer.mongoose;
module.exports.discordjs = tracer.discordjs;
module.exports.debug = tracer.debug;
module.exports.general = tracer.general;