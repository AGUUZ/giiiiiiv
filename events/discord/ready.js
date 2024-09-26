const register = require('../../utils/slashsync');
const { ActivityType } = require('discord.js');

module.exports = async (client) => {
/*   await register(client, client.register_arr.map((command) => ({
    name: command.name,
    description: command.description,
    options: command.options,
    type: '1'
  })), {
    debug: true
  }); */
  console.log(`[ / | Slash Command ] - :white_check_mark: Loaded all slash commands!`)
  let invite = `https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=applications.commands%20bot`;
  console.log(`[STATUS] ${client.user.tag} is now online!`);
  client.user.setPresence({
  activities: [{ name: `Rs GIVEAWAY`, type: ActivityType.Watching }],
  status: 'online',
});
};