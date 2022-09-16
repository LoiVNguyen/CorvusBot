require('dotenv').config(); 

const mongoose = require('mongoose');
const { Client, GatewayIntentBits } = require('discord.js');
const StoreBuild = require('../all_commands/storebuild');
const GetBuild = require('../all_commands/getbuild');
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
]
});


client.on('interactionCreate', async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const { commandName } = interaction;

	if (commandName === 'storebuild') {
		StoreBuild.storeBuild(interaction);
	} 
	else if (commandName === 'getbuild') {
		GetBuild.getBuild(interaction);
	} 
	else if (commandName === 'deletebuild') {
		await interaction.reply('Delete build command working in progress!');
	}
});


client.on('ready', async () => {
	await mongoose.connect(process.env.MONGODB_URI, {
		keepAlive: true
	}).then(() => {
		console.log('Connected to the database!');
	}).catch(console.error); 

    console.log(`${client.user.username} has logged in!`);

}); 

client.login(process.env.CORVUS_BOT_TOKEN);
