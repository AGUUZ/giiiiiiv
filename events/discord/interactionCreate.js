module.exports = (client, interaction) => {

    if (interaction.isCommand()) {


    const command = client.interactions.get(interaction.commandName);


    if (!command) return interaction.reply({
      content: "حدث خطا تواصل مع المبرمج اذا لم يتم حلها?",
      ephemeral: true
    });

    command.run(client, interaction);
  }
}