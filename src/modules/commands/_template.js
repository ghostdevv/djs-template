// This won't load as it has a underscore (_) in front of it's name
module.exports = {
    props: {
        id: 'test', // This is the ID, this is used for debugging and storing
        commands: ['test', 'a'] // These are the command words, these must be unique and link back to this file
    },
    run: (client, message, args) => console.log('Hello World!') // This is the run function, this is called everytime a command with the above command words is executed
};