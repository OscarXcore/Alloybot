const database = _connections.get('database').db;
const discord = _connections.get('discord').client;

discord.guilds.forEach((guild) => {
  let name = `guild_${guild.id}`;
  database.createCollection(name).then((collection) => {
    collection.find({ _plugin: 'core' }, (error, result) => {
      result.count().then((i) => {
        if (i < 1)
          collection.insertOne(
            {
              _version: 1,
              _plugin: 'core',
              guild: { id: guild.id, ownerId: guild.ownerID }
            },
            { forceServerObjectId: true }
          );
      });
    });
  });
});
//JSON.parse(t.substring(7, t.length))
