function main(onMessageEvent, messageToSend) {
    onMessageEvent.author.createDM().then(dm => {
        dm.send(messageToSend);
        onMessageEvent.channel.send(`Hey <@${onMessageEvent.author.id}>, I just sent you a DM.`);
    }).catch(error => {
        console.error(error);
    });
}

module.exports = main;