// The event name is decided based on the file name, so if you removed the underscore (_) from this file name it would run if a event called template is emitted

// The props passed are event specific, for example, on messageReactionAdd you would get the props client, reaction, user. client is always passed, other arguments come in their order after client (check the docs for each event)
module.exports = client => {
    console.log('Hello from template.js');
};