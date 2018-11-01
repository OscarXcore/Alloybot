const database = _connections.get('database').db;
const discord = _connections.get('discord').client;

let document = { _version: 1, _plugin: 'musicbot', queue: [] };
let query = { _plugin: 'musicbot' };

database.collections().then((items) => {
  for (i in items) {
    if (items[i].collectionName.startsWith('guild_')) {
      let cursor = items[i].find(query).count();
      cursor.then((n) => {
        if (n > 1)
          logger.warn({
            prefix: 'Database',
            message: `${
              items[i].collectionName
            } contains more than 1 musicbot object. May cause issues.`
          });
        if (n < 1) items[i].insertOne(document, { forceServerObjectId: true });

        items[i].findOneAndReplace(
          {
            _version: { $lt: document._version }
          },
          document,
          (original) => {
            items[i].updateOne(
              { _version: document._version },
              {
                $set: {
                  queue: original.queue
                }
              }
            );
          }
        );
      });
    }
  }
});
