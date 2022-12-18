const { SlashCommandBuilder, CommandInteraction } = require('discord.js');
const { create } = require("../../util/embeds");
const names = require("../../data/reindeernames.json");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('reindeername')
		.setDescription('Replies with a random name for a reindeer.'),
    /**
     * 
     * @param {CommandInteraction} interaction 
     */
	async execute(interaction) {
        const name = names.sort(() => Math.random() - 0.5)[0]
		await interaction.reply({ embeds: [ create('Random Reindeer Name', `You should name your reindeer ${name}!`) ], ephemeral: true });
	},
};