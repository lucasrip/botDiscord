const { SlashCommandBuilder } = require('discord.js');

module.exports = {

    data:new SlashCommandBuilder()
         .setName("playlist")
         .setDescription("ouça a melhor playlist"),
    
    async execute(interaction)
    {
        await interaction.reply("https://open.spotify.com/playlist/2uOxtg4M03lwGl0foNJ8E1?si=169b269a69844d40")
    }
}