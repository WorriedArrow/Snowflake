const { SlashCommandBuilder, CommandInteraction } = require('discord.js');
const { create } = require("../../util/embeds");
const sleep = require("../../util/sleep");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('hacksanta')
		.setDescription('Hack into Santa\'s mainframe and see if you\'re getting presents or coal.'),
    /**
     * 
     * @param {CommandInteraction} interaction 
     */
	async execute(interaction) {
        const embeds = [
            create('Hack Santa\'s Mainframe', `\`\`\`Hacking initiated...\`\`\``),
            create('Hack Santa\'s Mainframe', `\`\`\`Hacking initiated...\n\nCracking password of RHEL installation...\`\`\``),
            create('Hack Santa\'s Mainframe', `\`\`\`Hacking initiated...\n\nCracking password of RHEL installation...\nDone.\`\`\``),
            create('Hack Santa\'s Mainframe', `\`\`\`Hacking initiated...\n\nCracking password of RHEL installation...\nDone.\n\nSearching EXT4 file system for ${interaction.user.tag}'s status...\`\`\``),
            create('Hack Santa\'s Mainframe', `\`\`\`Hacking initiated...\n\nCracking password of RHEL installation...\nDone.\n\nSearching EXT4 file system for ${interaction.user.tag}'s status...\nDone.\n\nYou are recieving ${Math.random() > 0.78 ? "COAL" : "PRESENTS"}.\`\`\``)
        ]

		await interaction.reply({ embeds: [ embeds[0] ], ephemeral: true })
        await sleep(1128);
        interaction.editReply({ embeds: [ embeds[1] ], ephemeral: true })
        await sleep(2083);
        interaction.editReply({ embeds: [ embeds[2] ], ephemeral: true })
        await sleep(932);
        interaction.editReply({ embeds: [ embeds[3] ], ephemeral: true })
        await sleep(2931);
        interaction.editReply({ embeds: [ embeds[4] ], ephemeral: true })
	},
};