const { SlashCommandBuilder, CommandInteraction } = require('discord.js');
const { create } = require("../../util/embeds");
const holidays = require("../../data/holidays.json");
const moment = require("moment");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('todaysholiday')
		.setDescription('Replies with a random holiday happening today.'),
    /**
     * 
     * @param {CommandInteraction} interaction 
     */
	async execute(interaction) {
      const todaysHolidays = holidays.filter(({ date }) => date.split('-')[1] == moment().format('MM') && date.split("-")[2] == moment().format('DD'));
      const holiday = todaysHolidays.sort(() => Math.random() - 0.5)[0]
      if(holiday) {
		    await interaction.reply({ embeds: [ create('Today\'s Holiday', `One holiday happening in the US today is ${holiday.name}.`) ], ephemeral: true });
      } else {
		    await interaction.reply({ embeds: [ create('Today\'s Holiday', `Hmmm... I couldn't find any holidays happening in the US today. Check back tomorrow!`) ], ephemeral: true });
      }
	},
};