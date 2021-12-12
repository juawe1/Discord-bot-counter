const testing = true;

const {Client, Intents} = require('discord.js');

const myIntents = new Intents();
myIntents.add(Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS);

const client = new Client({ intents: myIntents });


client.on('ready', () =>{

    console.log(`Logged in as ${client.user.tag}`)

    if (testing){
       client.guilds.cache.get("919382180449370173").channels.cache.get("919382180449370176").send("Spook!");
    };
    
});

client.on('messageCreate', async msg =>{
    if (msg.content === "ping"){
        msg.reply('pong')
    } else if (msg.content === "!Pyro"){
        msg.reply('Mans got 0 bitches :)');
    };
});

client.on('messageDelete', async msg => {
    client.guilds.cache.get('919382180449370173').channels.cache.get('919382180449370176').send(`Someone deleted a message, the message was '${msg}'`);
})

client.on('GuildMemberRemove', async member =>{
  const fetchedLogs = await member.guild.fetchAuditLogs({
      limit: 1, 
      type: 'MEMBER_KICK',
  });

  const kicklog = fetchedLogs.first();

  if (!kicklog) return console.log(`${member.user.tag} left at their own will`);

  const { executor, target } = kicklog;

  if (kicklog.createdAt < member.joinedAt) {
      return console.log(`${member.user.tag} left at their own will`);
  }

  if (target.id === member.id) {
    console.log(`${member.user.tag} left the guild; kicked by ${executor.tag}?`);
  } else {
        console.log(`${member.user.tag} left the guild, audit log fetch was inconclusive.`);
  }
});


client.login(process.env.TOKEN);