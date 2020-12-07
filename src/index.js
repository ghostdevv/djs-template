require('dotenv').config();
const { join } = require('path');
const { Client } = require('./client');

const client = new Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION', 'USER', 'GUILD_MEMBER'] });

client.loadEvents(join(__dirname, './modules/events'));
client.loadCommands(join(__dirname, './modules/commands'));

client.listenForCommands();

client.login(process.env.TOKEN);