const { Client, Events, GatewayIntentBits, Collection } = require('discord.js');

const dontenv = require('dotenv');
const fs = require("node:fs");
const path = require("node:path");

//importando comandos
const commandsPath = path.join(__dirname,"commands");
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith(".js"));

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.commands = new Collection();

//dontenv

dontenv.config();
const { TOKEN,CLIENTID, GUILDID} = process.env;

for(const file of commandFiles)
{
    const filePath = path.join(commandsPath,file);
    const command = require(filePath);
    
    if("data" in command && "execute" in command)
    {
      client.commands.set(command.data.name,command)
    }
    else
    {
        console.log(`Esse comando em ${filePath} está com "data" ou "execute" ausentes `);
    }
}

//login do bot
client.once(Events.ClientReady, c => {
	console.log(`Pronto Login Realizado como ${c.user.tag}`);
});

client.login(TOKEN);

//listener de interações com o bot

client.on(Events.InteractionCreate, async interaction =>{


    if(interaction.isStringSelectMenu())
    {
      const selected = interaction.values[0];

      if (selected == "javascript"){
        await interaction.reply("Documentação do Javascript: https://developer.mozilla.org/en-US/docs/Web/JavaScript")
    } else if (selected == "python"){
        await interaction.reply("Documentação do Python: https://www.python.org")
    } else if (selected == "csharp"){
        await interaction.reply("Documentação do C#: https://learn.microsoft.com/en-us/dotnet/csharp/")
    } else if (selected == "discordjs"){
        await interaction.reply("Documentação do Discord.js: https://discordjs.guide/#before-you-begin")
    }
    }

    if(!interaction.isChatInputCommand()) return;
    const command = interaction.client.commands.get(interaction.commandName);

    if(!command)
    {
        console.error("comando nao encontrado")
        return
    }


    try {
        await command.execute(interaction)
    } catch (error) {
        console.error(error)
        await interaction.replay("houve um erro ao executar este comando")
    }
})