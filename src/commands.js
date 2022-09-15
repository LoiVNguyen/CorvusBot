require('dotenv').config(); 
const { REST } = require('@discordjs/rest');
const { SlashCommandBuilder, Routes } = require('discord.js');


const commands = [
	new SlashCommandBuilder()
	.setName('storebuild')
	.setDescription('Stores build associated with user and unit name.')
	.addStringOption(option => 
		option.setName('unitname')
		.setDescription('Select unit.')
		.setRequired(true)
	)
	.addStringOption(option => 
		option.setName('imagelink')
		.setDescription('Link to image.')
		.setRequired(true)),

	new SlashCommandBuilder().setName('getbuild').setDescription('Gets build associated with user and unit name'),
	new SlashCommandBuilder().setName('deletebuild').setDescription('Deletes build associated with user and unit name')
]
	.map(command => command.toJSON());


const rest = new REST({ version: '10' }).setToken(process.env.CORVUS_BOT_TOKEN);

rest.put(Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID), { body: commands })
	.then((data) => console.log(`Successfully registered ${data.length} application commands.`))
	.catch(console.error);