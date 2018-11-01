const database = _connections.get('database').db;
const discord = _connections.get('discord').client;
let collections = database.listCollections({ nameOnly: true })
collections = collections.toArray();

collections.then(array => {
    discord.guilds.forEach(guild => {
        let doc = { _version: 1, _plugin: "core", guild: { id: guild.id, ownerId: guild.ownerID } }
        let name = `guild_${guild.id}`;
        if (!array.includes(name))
        database.createCollection(name)
        .then(collection => {
            collection.insertOne(doc, { forceServerObjectId: true });
        });
    });
});