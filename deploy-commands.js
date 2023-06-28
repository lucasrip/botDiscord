const {REST,Routes} = require("discord.js");

const fs = require("node:fs");
const path = require("node:path");
//dotenv
const dontenv = require('dotenv');
dontenv.config();
const { TOKEN,CLIENTID, GUILDID} = process.env;

//importando comandos
const commandsPath = path.join(__dirname,"commands");
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith(".js"));

const commands = [];

for(const file of commandFiles)
{
    const command = require(`./commands/${file}`);
    commands.push(command.data.toJSON());
}

//instancia REST
const rest = new REST({version:'10'}).setToken(TOKEN);

//deploy
(async ()=> {
 try {
    
    console.log(`Resetando ${commands.length} comandos`)
    const data = await rest.put(
        Routes.applicationGuildCommands(CLIENTID,GUILDID),
        {body: commands}
    )

    console.log("Comandos registrados com sucesso!");

 } catch (error) {
    console.error(error);
 }

})();