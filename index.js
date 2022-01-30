const Discord = require('discord.js');
const fs = require('fs');
const { checkCommandModule, checkProperties } = require('./src/events/vaildData');
const intents = new Discord.Intents(32767);
const client = new Discord.Client({ intents });
const config = require('./src/config');
const mongoose = require('mongoose')
//----------------------------------------Client Functions----------------------------------------\\ Layer Coding : !                  Marquis#9999

client.commands = new Discord.Collection()
client.slash = []
client.config = config;

//-----------------------------------------Mongodb Connect-----------------------------------------\\ Layer Coding : !                  Marquis#9999

mongoose.connect(config.Bot.mongodb, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }, (err) => {
    if(err) return console.log(err)
    console.log('Connected to Layer DB')
})

//------------------------------------------File Readder------------------------------------------\\ Layer Coding : !                  Marquis#9999

// Bot Commands

fs.readdir('./src/commands', (err, folders) => {
    if (err) return console.log(err);
    folders.forEach(folder => {
        fs.readdir(`./src/commands/${folder}`, (err, files) => {
            if (err) return console.log(err);
            files.forEach(file => {
                let cmdName = file.split('.')[0],
                    cmdModule = require(`./src/commands/${folder}/${file}`)
                if (checkCommandModule(cmdName, cmdModule)) {
                    if (checkProperties(cmdName, cmdModule)) {
                        client.slash.push(cmdModule)
                        client.commands.set(cmdModule.name, cmdModule)
                    }
                }
            })
        })
    })
})

// Client Events Handler

fs.readdir('./src/client/', (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        const event = require(`./src/client/${file}`);
        let eventName = file.split(".")[0];
        client.on(eventName, event.bind(null, client));
    });
});

//-----------------------------------------BY: Marquis#9999-----------------------------------------\\ Layer Coding : !                  Marquis#9999

client.login(config.Bot.token)
