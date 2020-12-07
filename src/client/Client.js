const { Client: DiscordClient, Collection } = require('discord.js');
const { basename, normalize } = require('path');
const { readdirRecursive } = require('../util');

class Client extends DiscordClient {

    constructor(opt = {}) {
        super(opt);
    };

    loadEvents(dir) {
        try {
            const events = readdirRecursive(dir).filter(f => f.endsWith('.js') && !basename(f).startsWith('_')).map(f => ({ name: basename(f, '.js'), path: normalize(f) }));
            for (const { name, path } of events) {
                this.on(name, require(path).bind(null, this));
            };
        }
        catch(e) {
            console.log(e, '\n There has been an error loading events.')
        }
    };

    loadCommands(dir) {
        this.commands = new Collection();

        try {
            const commands = readdirRecursive(dir).filter(f => f.endsWith('.js') && !basename(f).startsWith('_')).map(f => ({ props: require(normalize(f)).props, path: normalize(f) }));

            for (const { props, path } of commands) {
                if (!props) return console.log(`Unable to load a command; ID: ${props.id}. No props given`);
                if (!props.commands || !Array.isArray(props.commands)) return console.log(`Unable to load a command; ID: ${props.id}. No valid command array given`);
                for (const command of props.commands) {
                    if (this.commands.get(command)) return console.log(`Unable to load command; ID: ${props.id}. Command word ${command} is taken`);
                    this.commands.set(command, require(path));
                    console.log(`Loaded command word ${command} for ${props.id}`);
                };
            };
        }
        catch(e) {
            console.log(e)
            console.log('There has been an error loading commands.')
        }
    };

    listenForCommands() {
        if (this._listening == true) return "Unable to listen twice";

        this._listening = true;
        this.prefix = this.prefix ? this.prefix : process.env.PREFIX ? process.env.PREFIX : '-';

        this.on('message', async message => {
            if (message.partial) message = await message.fetch();
            if (message.author.bot || !message.content.startsWith(this.prefix)) return;

            const command = message.content.slice(this.prefix.length).match(/^[\w\d]+/gi)[0];
            const args = message.content.slice(command.length).split(' ');

            const foundCommand = this.commands.get(command);
            if (foundCommand) foundCommand.run(client, message, args);
        });
    };
};

module.exports = Client;