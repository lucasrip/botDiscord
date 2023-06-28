const { SlashCommandBuilder,StringSelectMenuBuilder, StringSelectMenuOptionBuilder, ActionRowBuilder } = require('discord.js');

const row = new ActionRowBuilder()
    .addComponents(
    new StringSelectMenuBuilder()
     .setCustomId("select")
     .setPlaceholder("nenhuma linguagem selecionada")
     .addOptions({
        label:"javascript",
        description:"veja a documentacao do javascript",
        value:"javascript"
     },
     {
        label:"python",
        description:"veja a documentacao do python",
        value:"python"
     },
     {
        label:"c#",
        description:"veja a documentacao do c#",
        value:"c#"
     },
     {
        label:"c",
        description:"veja a documentacao do c",
        value:"c"
     },
     {
        label:"c++",
        description:"veja a documentacao do c++",
        value:"c++"
     },
     {
        label:"delphi",
        description:"veja a documentacao do delphi",
        value:"delphi"
     },
     )
);

module.exports = {

    data:new SlashCommandBuilder()
         .setName("docs")
         .setDescription("Acesse a documentação da tecnologia que quiser"),
    
    async execute(interaction)
    {
       await interaction.reply({content:"selecione uma das tecnologias a baixo",components:[row]});

   
    }
}