const Discord = require("discord.js"); //baixar a lib
const client = new Discord.Client(); 
const config = require("./config.json"); 


client.on("ready", () => {
  console.log(`Bot foi iniciado, com ${client.users.size} usuários, em ${client.channels.size} canais, em ${client.guilds.size} servidores.`); 
  client.user.setPresence({ game: { name: 'Los Mercenários 171', type: 0, url: 'https://pt.socialclub.rockstargames.com/crew/los_mercenarios_171/wall'} });
  
});

client.on('raw', async dados => {
  if(dados.t == 'PRESENCE_UPDATE' && client.guilds.get("402770024634515456").members.get(dados.d.user.id)){
    let membro = client.guilds.get("402770024634515456").members.get(dados.d.user.id)

    if(dados.d.game == null) return membro.removeRole("662330869180137493")
    if(dados.d.game.name == undefined) return membro.removeRole("662330869180137493")
    if(dados.d.game.name == "Grand Theft Auto V" && dados.d.status == "online") return membro.addRole("662330869180137493")


  
  }
})
client.on("raw", async fig => {
  if(fig.t !== "MESSAGE_REACTION_ADD" && fig.t !== "MESSAGE_REACTION_REMOVE") return
  if(fig.d.message_id != "659925988725096458") return //mensagem
  
  let servidor = client.guilds.get("402770024634515456")// server
  let calango = servidor.members.get(fig.d.user_id)
  
  let menbro171 = servidor.roles.get('481543909747589120'),
  visitante = servidor.roles.get('659927805378953216'),
  recrutra171 = servidor.roles.get('659928509581623327'),
  novato171 = servidor.roles.get('481166865729716237')

  if(fig.t === "MESSAGE_REACTION_ADD"){
    if(fig.d.emoji.id === "481553333375467520"){
    if(calango.roles.has(menbro171)) return
    calango.addRole(menbro171),
    calango.removeRole(visitante),
    calango.removeRole(recrutra171),
    calango.removeRole(novato171)
  }else if(fig.d.emoji.id === "549367300898291723"){
  if(calango.roles.has(visitante)) return
  calango.addRole(visitante),
  calango.removeRole(menbro171),
  calango.removeRole(recrutra171),
  calango.removeRole(novato171)
  }else if(fig.d.emoji.id === "481193258274521095"){
    if(calango.roles.has(recrutra171)) return
    calango.addRole(recrutra171),
    calango.removeRole(menbro171),
    calango.removeRole(visitante),
    calango.removeRole(novato171)

  }
}

 if(fig.t === "MESSAGE_REACTION_ADD"){
    if(fig.d.emoji.id === "481553333375467520"){
    if(calango.roles.has(menbro171)) return
    calango.removeRole(menbro171),
    calango.addRole(novato171)
    }else if(fig.d.emoji.id === "549367300898291723"){
      if(calango.roles.has(visitante)) return
      calango.removeRole(visitante),
      calango.addRole(novato171)
    }else if(fig.d.emoji.id === "481193258274521095"){
      if(calango.roles.has(recrutra171)) return
      calango.removeRole(recrutra171),
      calango.addRole(novato171)
    }
  }

})

client.on("message", async message => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;
  if(!message.content.startsWith(config.prefix)) return;
 
const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
const comando = args.shift().toLowerCase();

// coamdno ping
if(comando === "muamba") {
  message.delete().catch(O_o=>{});
  message.channel.send(`O membro ${message.author} está precisando de ajuda para puxar muamba <@&481543909747589120> <@&481565447980843019> <@&487447814834749450>`);
 
}

if(comando === "exportação") {
  message.delete().catch(O_o=>{});
  message.channel.send(`O membro ${message.author} está precisando de ajuda para fazer exportação de veículos <@&481543909747589120> <@&481565447980843019> <@&487447814834749450>`);
 
}

if(comando === "bunker") {
  message.delete().catch(O_o=>{});
  message.channel.send(`O membro ${message.author} está precisando de ajuda para suprimentos ou venda do bunker <@&481543909747589120> <@&481565447980843019> <@&487447814834749450>`);
 
}

if(comando === "esquema") {
  message.delete().catch(O_o=>{});
  message.channel.send(`O membro ${message.author} está precisando de ajuda para suprimentos ou venda de esquemas do moto club <@&481543909747589120> <@&481565447980843019> <@&487447814834749450>`);
 
}

if(comando === "missão") {
  message.delete().catch(O_o=>{});
  message.channel.send(`O membro ${message.author} está precisando de ajuda para fazer missões <@&481543909747589120> <@&481565447980843019> <@&487447814834749450>`);
 
}


if(comando === "say") { 
  message.delete().catch(O_o=>{});
   if(!message.member.roles.some(r => ["Staff"].includes(r.name)))
    return message.reply("Somente um menbro da staff pode utilizar este comando.");
     const sayMessage = args.join(" ");
      message.channel.send(sayMessage);
 }
  });

  
  client.on("message", async messagem => {
    if(messagem.author.bot) return;
    if(messagem.channel.type === "dm") return;

    if(messagem.content == "ajuda"){
      messagem.delete().catch(O_o=>{});
      messagem.reply("Ultilize os seguintes comandos! ```!missão para solicitar ajuda em missões, !esquema para solicitar ajuda nos esquemas, !bunker para solicitar ajuda no seu bunker, !exportação para solicitar ajuda para realizar as esportações, !muamba para socilitar ajuda com os esquemas de muamba.```")
  }
});


  
client.on("raw", console.log)

client.login(config.token);
 