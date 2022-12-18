// Require the necessary discord.js classes
const { Client, Events, GatewayIntentBits, REST, Routes, ActivityType } = require('discord.js');
const { clientId, token } = require('./config.json');
const { create } = require("./util/embeds");
const fs = require('node:fs');

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

const commands = [];
// Grab all the command files from the commands directory you created earlier
const cmdFiles = fs.readdirSync('./commands').map(dir => fs.readdirSync("./commands/" + dir).filter(file => file.endsWith('.js')).map(file => `./commands/${dir}/${file}`));
const commandFiles = [];
cmdFiles.forEach(arr => arr.forEach(elem => commandFiles.push(elem)));

// Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
for (const file of commandFiles) {
	const command = require(file);
	commands.push(command);
}

console.log(commands);

// Construct and prepare an instance of the REST module
const rest = new REST({ version: '10' }).setToken(token);

// and deploy your commands!
(async () => {
	try {
		console.log(`Started refreshing ${commands.length} application (/) commands.`);

		// The put method is used to fully refresh all commands in the guild with the current set
		const data = await rest.put(
			Routes.applicationCommands(clientId),
			{ body: commands.map(cmd => cmd.data.toJSON()) },
		);

		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
	} catch (error) {
		// And of course, make sure you catch and log any errors!
		console.error(error);
	}
})();

client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const command = commands.filter(cmd => cmd.data.name == interaction.commandName)[0];

	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ embeds: [ create('An error occured!', 'Uh oh... there was an error while executing this command!') ], ephemeral: true });
	}
});

// When the client is ready, run this code (only once)
// We use 'c' for the event parameter to keep it separate from the already defined 'client'
client.once(Events.ClientReady, c => {
	console.log(`Ready! Logged in as ${c.user.tag}`);
	c.user.setPresence({
		status: "online",
		activities: [
			{
				name: "with snowflakes",
				type: ActivityType.Playing,
			}
		],
	})
});

// Log in to Discord with your client's token
client.login(token);