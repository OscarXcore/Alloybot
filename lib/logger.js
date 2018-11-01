const { Signale } = require('signale');

const opts = (_options.signale = {
  types: {
    await: {
      badge: '💤'
    },
    complete: {
      badge: '✔'
    },
    error: {
      badge: '❗'
    },
    debug: {
      badge: '🌫'
    },
    fatal: {
      badge: '‼'
    },
    fav: {
      badge: '🔆'
    },
    info: {
      badge: '❕'
    },
    note: {
      badge: '❔'
    },
    pause: {
      badge: '⏸'
    },
    pending: {
      badge: '⌚'
    },
    star: {
      badge: '🌟'
    },
    start: {
      badge: '🔄'
    },
    success: {
      badge: '👌'
    },
    warn: {
      badge: '⚠'
    },
    watch: {
      badge: '👀'
    },
    log: {
      badge: '💬'
    }
  }
});

global.logger = new Signale(opts);

// Log Levels
// Defualt: await, complete, error, debug, fatal, fav, info, note, pause, pending, star, start, success, warn, watch, log
// Custom:
