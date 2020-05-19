const build = require('./build.js');

module.exports = (client) => {

  client.on('message', (message) => {
    if (message.author.bot) return;
    for (let command in build.available_commands) {
      if (message.content.startsWith(command)) build.available_commands[command].func(client, message);
    };
  });

  client.on('ready', () => { /**/ });
  client.login(process.env.DISCORD_TOKEN);
  return client;

};
