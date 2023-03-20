import { ActionRowBuilder, ModalBuilder, SlashCommandBuilder, TextInputBuilder, TextInputStyle } from "discord.js";
import randomWords from 'random-words';

export default {
	data: new SlashCommandBuilder()
		.setName('register')
		.setDescription('Register inscription ids.'),
	async execute(interaction) {

		const words = randomWords(2);

		const modal = new ModalBuilder()
			.setCustomId('myModal')
			.setTitle('Register')

		const inscriptionInput = new TextInputBuilder()
			.setCustomId('inscriptionId')
			.setLabel("What's your inscription id?")
			.setStyle(TextInputStyle.Paragraph);
		const signatureInput = new TextInputBuilder()
			.setCustomId('signature')
			.setLabel(`Signature for "${words.join(" ")}"`)
			.setStyle(TextInputStyle.Paragraph);

		// An action row only holds one text input,
		// so you need one action row per text input.
		const firstActionRow = new ActionRowBuilder<TextInputBuilder>().addComponents(inscriptionInput);
		const secondActionRow = new ActionRowBuilder<TextInputBuilder>().addComponents(signatureInput);

		// Add inputs to the modal
		modal.addComponents(firstActionRow);
		modal.addComponents(secondActionRow);

		// Show the modal to the user
		await interaction.showModal(modal);
	},
};