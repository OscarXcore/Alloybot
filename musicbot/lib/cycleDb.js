const database = _connections.get('database').db;
const discord = _connections.get('discord').client;
let collections = database.listCollections();
collections = collections.toArray();

let document = { _version: 1, _plugin: "musicbot", queue: [] };
let query = { _plugin: "musicbot" };

collections.then(array => {
    for (item in array) {
        if (item[1].name.startsWith("guild_")) {
            let cursor = item.find(query).toArray();
            cursor.length > 1
            ? _logger.warn({ prefix: "Database", message: `${item.name} contains more than 1 musicbot object. May cause issues.`})
            : cursor.length < 1
            ? item.insertOne(document, { forceServerObjectId: true })
            : () => {
                item.findOneAndReplace({ _version: { $ne: document._version}}, document, original => {
                    item.updateOne({ _version: document._version }, document.queue = original.queue);
                });
            }
        }
    }
})