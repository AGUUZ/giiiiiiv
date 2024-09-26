const { ApplicationCommandOptionType } = require('discord.js');

module.exports = {
    name: "ريرول",
    description: '🎉 ريرول',

    options: [
        {
            name: 'giveaway',
            description: 'ايدي الجيف او الجائزه',
            type: ApplicationCommandOptionType.String,
            required: true
        }
    ],

    run: async (client, interaction) => {


        if (!interaction.member.permissions.has('ManageMessages') && !interaction.member.roles.cache.some((r) => r.name === "Giveaways")) {
            return interaction.reply({
                content: ':x: You need to have the manage messages permission to reroll giveaways.',
                ephemeral: true
            });
        }

        const query = interaction.options.getString('giveaway');


        const giveaway =

            client.giveawaysManager.giveaways.find((g) => g.prize === query && g.guildId === interaction.guild.id) ||

            client.giveawaysManager.giveaways.find((g) => g.messageId === query && g.guildId === interaction.guild.id);


        if (!giveaway) {
            return interaction.reply({
                content: 'لم اجد الجيف`' + query + '`.',
                ephemeral: true
            });
        }

        if (!giveaway.ended) {
            return interaction.reply({
                content: `[This Giveaway](https://discord.com/channels/${giveaway.guildId}/${giveaway.channelId}/${giveaway.messageId}) لم ينتهي بعد`,
                ephemeral: true
            });
        }

        // Reroll the giveaway
        client.giveawaysManager.reroll(giveaway.messageId)
            .then(() => {
                // Success message
                interaction.reply(`Rerolled `);
            })
            .catch((e) => {
                interaction.reply({
                    content: e,
                    ephemeral: true
                });
            });

    }
};