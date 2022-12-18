const { SlashCommandBuilder, CommandInteraction } = require('discord.js');
const { create } = require("../../util/embeds");
const songs = require("../../data/christmassongs.json");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('christmassong')
		.setDescription('Replies with a random Christmas song.'),
    /**
     * 
     * @param {CommandInteraction} interaction 
     */
	async execute(interaction) {
        const song = songs.sort(() => Math.random() - 0.5)[0]
		await interaction.reply({ embeds: [ create('Random Christmas Song', `You should listen to ${song} over the holidays!`) ], ephemeral: true });
	},
};