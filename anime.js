const { getQuote } = require('..fetch-quote');
const { commandInfo, errorResponse, formatResponse } = require('../util');

module.exports = {
	name: 'quote',
	description: 'Get a random quote or get a specific one by anime/character name.',
	cooldown: 5,
	args: true,
	usage: commandInfo,
	async execute(message, args) {

		if(args[0] === 'random') {
			const response = await getQuote('/random');
			return message.channel.send(formatResponse(response));
		}


		if(args[0] === 'anime') {
			const animeName = args.slice(1).join(' ');
			if(!animeName) {
				return message.channel.send(errorResponse('No anime name is provided. Please provide a valid anime name'));
			}

			const response = await getQuote(`/random/anime?title=${animeName}`);

			if(!response) {
				return message.channel.send(errorResponse(`Gak ada "${animeName}" untuk sekarang !`));
			}

			return message.channel.send(formatResponse(response));
		}


		if(args[0] === 'char') {
			const characterName = args.slice(1).join(' ');
			if(!characterName) {
				return message.channel.send(errorResponse('Kirim nama yang valid ya'));
			}

			const response = await getQuote(`/random/character?name=${characterName}`, message);

			if(!response) return message.channel.send(errorResponse(`Gak ada quote "${characterName}" untuk sekarang !`));

			return message.channel.send(formatResponse(response));
		}

		return message.channel.reply('⚠️ **Command apa itu!** Coba !help');
	},
};
