const database = _connections.get('database').db;
const discord = _connections.get('discord').client;

discord.guilds.forEach(guild => {
    let name = `guild_${guild.id}`;
    database.collection(name, (error, collection) => {
        //if (collection) console.log(collection);
        if (error != null || undefined) database.createCollection(name)
        .then(collection => {
            collection.insertOne({ _version: 1, _plugin: "core", guild: { id: guild.id, ownerId: guild.ownerID } }, { forceServerObjectId: true });
        });
    })
})

/*database.collections().then(items => {
    console.log(items);
    discord.guilds.forEach(guild => {
        let name = `guild_${guild.id}`;
        for (i in items) {
            if (items[i].collectionName == name)
            database.createCollection(name)
            .then(collection => {
                collection.insertOne({ _version: 1, _plugin: "core", guild: { id: guild.id, ownerId: guild.ownerID } }, { forceServerObjectId: true });
            });
        }
    });
});*/