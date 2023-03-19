import { Collection, Events, GuildMember, REST, Routes, TextChannel } from "discord.js";
import { Client, GatewayIntentBits } from 'discord.js';
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();
import { verify_signature } from "./bitcoin-rpc";
import inscriptions from "./inscriptions";
import configureCommand from './commands/configure';
import registerCommand from './commands/register';

// Creating a new Discord client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers]});

// Creating a collection to store all commands
client['commands'] = new Collection();
// Adding the configure and register commands to the collection
client['commands'].set(configureCommand.data.name, configureCommand);
client['commands'].set(registerCommand.data.name, registerCommand);

// Creating an array of all the commands in JSON format
const commands = [
  configureCommand.data.toJSON(),
  registerCommand.data.toJSON()
];

// Creating a new REST instance to communicate with Discord API
const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

// Updating the registered application commands with the commands array
(async () => {
  try {
    console.log('Started refreshing application (/) commands.');

    await rest.put(Routes.applicationCommands("1085831488458739712"), { body: commands });
    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error(error);
  }
})();

// Handling the 'ready' event, which fires when the client is ready
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

// Handling the 'InteractionCreate' event, which fires when a user interacts with a slash command
client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const command = client['commands'].get(interaction.commandName);

	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
		} else {
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	}
});

// Handling the 'InteractionCreate' event again, but for the modal submit event
client.on(Events.InteractionCreate, async(interaction) => {
	if (!interaction.isModalSubmit()) return;

	const member = interaction.guild.members.cache.get(interaction.user.id);
	const inscriptionId = interaction.fields.fields.get("inscriptionId").value;
	const signature = interaction.fields.fields.get("signature").value;
	if(!inscriptionId || !signature) {
		interaction.reply({ content: 'Invalid input', ephemeral: true });
		return;
	}
	const inscriptionInfo = (await axios.get(process.env.INSCRIPTION_API + "/" + inscriptionId)).data;
	console.log(inscriptionInfo);
	try{
		const result = await verify_signature({ address: inscriptionInfo.address, signature, message: "munch munch"});
		if(result.error) throw new Error(result.error);
		const role = inscriptions[inscriptionId];
		await member.roles.add(role);

		interaction.reply({ content: 'You are approved' });
	} catch(e) {
		interaction.reply({ content: 'Signature mismatch', ephemeral: true})
	}
});

// When a new member joins the server
client.on(Events.GuildMemberAdd, (member: GuildMember) => {
	console.log("new member", member.user);
	const channel = client.channels.cache.find(ch => ch['name'] == 'welcome-channel');
  
	if (!channel) return;
	console.log('channel', channel);
	(channel as TextChannel).send(`Welcome to the server, ${member}! Will you register now? /register`);
});
  
// Discord bot login
client.login(process.env.TOKEN);