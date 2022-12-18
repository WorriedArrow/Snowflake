const { SlashCommandBuilder, CommandInteraction, SlashCommandSubcommandBuilder, SlashCommandUserOption, SlashCommandStringOption } = require('discord.js');
const { create } = require("../../util/embeds");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('user')
		.setDescription('Converts users')
        .addSubcommand(new SlashCommandSubcommandBuilder().setDescription("Converts to a user from a snowflake.").setName("from").addStringOption(new SlashCommandStringOption().setDescription("The snowflake to convert to a user.").setName("snowflake").setRequired(true)))
        .addSubcommand(new SlashCommandSubcommandBuilder().setDescription("Converts from a user to a snowflake.").setName("to").addUserOption(new SlashCommandUserOption().setDescription("The user to convert to a snowflake.").setName("user").setRequired(true))),
    /**
     * 
     * @param {CommandInteraction} interaction 
     */
	async execute(interaction) {
        if(interaction.options.getSubcommand() == "from") {
            if(interaction.guild.members.cache.has(interaction.options.getString("snowflake"))) {
                await interaction.reply({ embeds: [ create('User from Snowflake', `Hmm... let's see...\n\nAh, yes, that would be <@${interaction.options.getString("snowflake")}>!`) ], ephemeral: true });
            } else {
                await interaction.reply({ embeds: [ create('User from Snowflake', `Hmm... let's see...\n\nUh oh, I couldn't find that user!\nBe sure you entered the correct snowflake and that the user is in this server.`) ], ephemeral: true });
            }
        } else {
            if(interaction.guild.members.cache.has(interaction.options.getUser("user").id)) {
                await interaction.reply({ embeds: [ create('User to Snowflake', `Hmm... let's see...\n\nAh, yes, that would be \`${interaction.options.getUser("user").id}\`!`) ], ephemeral: true });
            } else {
                await interaction.reply({ embeds: [ create('User to Snowflake', `Hmm... let's see...\n\nUh oh, I couldn't find that user!\nBe sure you entered the correct user and that the user is in this server.`) ], ephemeral: true });
            }
        }
	},
};