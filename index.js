const testing = false;

const config = require('./config.json')

const {Client} = require('discord.js');

const client = new Client({ intents: 583 });
var KickAmount = 0;


client.on('ready', () =>{

    console.log(`Logged in as ${client.user.tag}`)

    if (testing){
       client.guilds.cache.get("919382180449370173").channels.cache.get("919382180449370176").send("Spook!");
    };
    
});

client.on('messageCreate', async msg =>{
    if (msg.content === "!count"){
        msg.reply(`Lewis has been kicked ${KickAmount}`)
    };
});

client.on('messageDelete', async msg => {
    client.guilds.cache.get(config.ServerID).channels.cache.get(config.GeneralChannelID).send(`Someone deleted a message, the message was '${msg}'`);
})

client.on('guildMemberAdd', async member =>{
    if (member.user.id === "589773384443887637"){
        client.guilds.cache.get(config.ServerID).channels.cache.get(config.GeneralChannelID).send(`Lewis has returned`);
    }else{
        client.guilds.cache.get(config.ServerID).channels.cache.get(config.GeneralChannelID).send(`${member.user.tag} has just joined`);
    };
});

client.on('guildMemberRemove', async member =>{

    if (member.user.id === config.lewisID){
        KickAmount += 1
        client.guilds.cache.get(config.ServerID).channels.cache.get(config.GeneralChannelID).send(`Lewis has been kicked ${KickAmount} times.`);
    }else{
        client.guilds.cache.get(config.ServerID).channels.cache.get(config.GeneralChannelID).send(`${member.user.tag} has been removed because he made dom cry`);
    };
});

client.login(config.token);