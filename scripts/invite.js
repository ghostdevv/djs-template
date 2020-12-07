require('dotenv').config();
const { parse } = require('dashargs');
const chalk = require('chalk');

const { TOKEN } = process.env;
const { permissions, admin } = parse(process.argv.slice(2).join(' '));

if (!TOKEN) return console.log(`${chalk.red('!')} Please provide your token as a environment variable of "TOKEN"`);

(async () => {
    console.log(formMultiLineResponse([
        'Generating your invite...\n',
        'In some terminals ctrl + click on the link to copy',
        'Add -permissions <number> to get specific permissions',
        'Add -admin to get the link with permissions 8 (admin)'
    ], true));

    const clientID = (Buffer.from(TOKEN.split('.')[0], 'base64')).toString();

    console.log(formResponse(`Client ID: ${clientID}`, true));
    
    console.log(formMultiLineResponse([
        `Basic invite link (no default permissions): ${chalk.underline(formInviteURL(clientID))}`,
        (admin ? `Link with admin permissions: ${chalk.underline(formInviteURL(clientID, 8))}` : ''),
        (permissions ? `Link with permissions given (${permissions}): ${chalk.underline(formInviteURL(clientID, permissions))}`: '')
    ], true, 'success'));
})();

function formInviteURL(id, permissions) {
    return `https://discord.com/oauth2/authorize?client_id=${id}&scope=bot${permissions ? `&permissions=${permissions}` : ''}`;
};

function prefixFromType(type) {
    switch (type) {
        case 'warn':
            return chalk.yellow('i');
        case 'error':
            return chalk.red('!');
        case 'success':
            return chalk.green('-');
        default:
            return chalk.magenta('e');
    };
};

function formMultiLineResponse(textArray, r, type) {
    const res = [];
    for (const item of textArray) {
        if (item.trim() != '') res.push(formResponse(item, false, type));
    };
    return res.join('\n') + (r ? '\n' : '');
};

function formResponse(text, r = false, type = 'warn') {
    const prefix = prefixFromType(type);
    return `${prefix} ${text}${r ? '\n' : ''}`;
};