const { SlashCommandBuilder, CommandInteraction } = require('discord.js');
const { create } = require("../../util/embeds");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Pong!'),
    /**
     * 
     * @param {CommandInteraction} interaction 
     */
	async execute(interaction) {
		await interaction.reply({ embeds: [ create('Ping', `🏓 Pong!\n\nAlso, in case you wanted it, the bot's ping right now is \`${interaction.client.ws.ping}ms\`.`) ], ephemeral: true });
	},
};