const { SlashCommandBuilder, CommandInteraction, SlashCommandSubcommandBuilder, SlashCommandChannelOption, SlashCommandStringOption } = require('discord.js');
const { create } = require("../../util/embeds");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('channel')
		.setDescription('Converts channels')
        .addSubcommand(new SlashCommandSubcommandBuilder().setDescription("Converts to a channel from a snowflake.").setName("from").addStringOption(new SlashCommandStringOption().setDescription("The snowflake to convert to a channel.").setName("snowflake").setRequired(true)))
        .addSubcommand(new SlashCommandSubcommandBuilder().setDescription("Converts from a channel to a snowflake.").setName("to").addChannelOption(new SlashCommandChannelOption().setDescription("The channel to convert to a snowflake.").setName("channel").setRequired(true))),
    /**
     * 
     * @param {CommandInteraction} interaction 
     */
	async execute(interaction) {
        if(interaction.options.getSubcommand() == "from") {
            if(interaction.guild.channels.cache.has(interaction.options.getString("snowflake"))) {
                await interaction.reply({ embeds: [ create('Channel from Snowflake', `Hmm... let's see...\n\nAh, yes, that would be <#${interaction.options.getString("snowflake")}>!`) ], ephemeral: true });
            } else {
                await interaction.reply({ embeds: [ create('Channel from Snowflake', `Hmm... let's see...\n\nUh oh, I couldn't find that channel!\nBe sure you entered the correct snowflake and that the channel is in this server.`) ], ephemeral: true });
            }
        } else {
            if(interaction.guild.channels.cache.has(interaction.options.getChannel("channel").id)) {
                await interaction.reply({ embeds: [ create('Channel to Snowflake', `Hmm... let's see...\n\nAh, yes, that would be \`${interaction.options.getChannel("channel").id}\`!`) ], ephemeral: true });
            } else {
                await interaction.reply({ embeds: [ create('Channel to Snowflake', `Hmm... let's see...\n\nUh oh, I couldn't find that channel!\nBe sure you entered the correct channel and that the channel is in this server.`) ], ephemeral: true });
            }
        }
	},
};