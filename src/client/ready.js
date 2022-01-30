module.exports = async (client) => {
    console.log(
        `====================LAYER CODING====================\n`,
        `name: ${client.user.tag}\n`,
        `id: ${client.user.id}\n`,
        `guilds: ${client.guilds.cache.size}\n`
    )

    client.guilds.cache.forEach(async guild => {
        try {
            await guild.commands.set(client.slash)
        } catch(err) { console.log('Ready_Error: Cannot create slash commands on', guild.name, guild.id);console.log(`Supported Invite Link: https://discord.com/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot%20applications.commands`) }
    });
    
}
// Layer Coding : !                  Marquis#9999
