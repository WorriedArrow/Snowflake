const { SlashCommandBuilder, CommandInteraction, SlashCommandSubcommandBuilder, SlashCommandRoleOption, SlashCommandStringOption } = require('discord.js');
const { create } = require("../../util/embeds");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('role')
		.setDescription('Converts roles')
        .addSubcommand(new SlashCommandSubcommandBuilder().setDescription("Converts to a role from a snowflake.").setName("from").addStringOption(new SlashCommandStringOption().setDescription("The snowflake to convert to a role.").setName("snowflake").setRequired(true)))
        .addSubcommand(new SlashCommandSubcommandBuilder().setDescription("Converts from a role to a snowflake.").setName("to").addRoleOption(new SlashCommandRoleOption().setDescription("The role to convert to a snowflake.").setName("role").setRequired(true))),
    /**
     * 
     * @param {CommandInteraction} interaction 
     */
	async execute(interaction) {
        if(interaction.options.getSubcommand() == "from") {
            if(interaction.guild.roles.cache.has(interaction.options.getString("snowflake"))) {
                await interaction.reply({ embeds: [ create('Role from Snowflake', `Hmm... let's see...\n\nAh, yes, that would be <@&${interaction.options.getString("snowflake")}>!`) ], ephemeral: true });
            } else {
                await interaction.reply({ embeds: [ create('Role from Snowflake', `Hmm... let's see...\n\nUh oh, I couldn't find that role!\nBe sure you entered the correct snowflake and that the role is in this server.`) ], ephemeral: true });
            }
        } else {
            if(interaction.guild.roles.cache.has(interaction.options.getRole("role").id)) {
                await interaction.reply({ embeds: [ create('Role to Snowflake', `Hmm... let's see...\n\nAh, yes, that would be \`${interaction.options.getRole("role").id}\`!`) ], ephemeral: true });
            } else {
                await interaction.reply({ embeds: [ create('Role to Snowflake', `Hmm... let's see...\n\nUh oh, I couldn't find that role!\nBe sure you entered the correct role and that the role is in this server.`) ], ephemeral: true });
            }
        }
	},
};