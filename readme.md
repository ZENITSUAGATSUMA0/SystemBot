# [LayerCoding system bot | بوت سستم لاير كودنق](https://discord.gg/RjNPebdKNr)

A Discord.js system bot that will complete all of your server requirements.

## Features | الملامح

- Build on `Discord.js v13`
- Easy to use and customize
- Has a multiple moderation commands
- Used interactionCommands (`'/' commands`)

## Requirement | المتطلبات

- [Node.js](https://nodejs.org/en/) v16.6.0 or higher
- [Discord.js](https://discord.js.org) v13
- [Mongodb cluster url](https://www.mongodb.com/) in config.js

## Installation | التنزيل

```npm
npm install discord.js@latest
```

## Handler Source | كود الهاندلر
### Normal | عادي

```js
module.exports = {
  // Important | مهم
  name: 'command_name', // Must be string | يجب ان يكون سترينج
  description: 'command description', // Must be string | يجب ان يكون سترينج
  category: 'command category', // 'Moderation' or 'Public'
  run: async function(client, interaction, args) {
    // Code here | الكود هنا
  }
}
```
---
### Advanced | متقدم
```js
module.exports = {
  // Important | مهم
  name: 'command_name', // Must be string | يجب ان يكون سترينج
  description: 'command description', // Must be string | يجب ان يكون سترينج
  category: 'command category', // 'Moderation' or 'Public'
  // Optional | إختياري
  permissions: {
    bot: 'permission', // Must be DiscordPermission | يجب ان يكون برمشن ديسكورد
    user: 'permission' // Must be DiscordPermission | يجب ان يكون برمشن ديسكورد
  },
  options: [
    {
      name: 'option_name', // Must be string | يجب ان يكون سترينج
      description: 'option description', // Must be string | يجب ان يكون سترينج
      type: 'option type', // Must be commandOptions type | يجب ان يكون نوع إعداد الأوامر
      required: true // or false
    }
  ],
  // Important | مهم
  run: async function(client, interaction, args) {
    // Code here | الكود هنا
  }
}
```

## Invite link | رابط دعوة البوت

- Change `BOT_ID` to your client id | إلى اي دي بوتك `BOT_ID` قم بتغيير
- `https://discord.com/oauth2/authorize?client_id=`BOT_ID`&permissions=8&scope=bot&application.commands`

---

# Made by: `Marquis#9999` The Hacker !