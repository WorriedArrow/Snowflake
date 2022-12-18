const { SlashCommandBuilder, CommandInteraction, SlashCommandSubcommandBuilder, SlashCommandStringOption } = require('discord.js');
const { create } = require("../../util/embeds");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('server')
		.setDescription('Converts servers')
        .addSubcommand(new SlashCommandSubcommandBuilder().setDescription("Converts to a server from a snowflake.").setName("from").addStringOption(new SlashCommandStringOption().setDescription("The snowflake to convert to a server.").setName("snowflake").setRequired(true))),
    /**
     * 
     * @param {CommandInteraction} interaction 
     */
	async execute(interaction) {
        if(interaction.options.getSubcommand() == "from") {
            if(interaction.client.guilds.cache.has(interaction.options.getString("snowflake"))) {
                await interaction.reply({ embeds: [ create('Server from Snowflake', `Hmm... let's see...\n\nAh, yes, that would be \`${interaction.client.guilds.cache.get(interaction.options.getString("snowflake")).name}\`!`) ], ephemeral: true });
            } else {
                await interaction.reply({ embeds: [ create('Server from Snowflake', `Hmm... let's see...\n\nUh oh, I couldn't find that server!\nBe sure you entered the correct snowflake and that the bot is in this server.\n\nWant to invite the bot? Just click [here](https://discord.com/api/oauth2/authorize?client_id=1049893687376744498&permissions=8&scope=bot)!`) ], ephemeral: true });
            }
        }
	},
};