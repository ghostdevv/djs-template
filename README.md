# DJS Template
A nice and modern discord.js template for your discord bots

# Get Started
Setup can be quick with [degit](https://github.com/Rich-Harris/degit)
```bash
npx degit ghostdevv/djs-template discord-bot
cd discord-bot
```

# Setup
```bash
npm install
cp .env.example .env
```
If the cp command doesn't work just manually make the .env file based on the example one

# Running
The .env file will include a NODE_ENV variable, this should be set to either `production` or `development`, the dev command will overwrite this.

- ### Development
    ```bash
    npm run dev
    ```

- ### Start
    ```bash
    npm run start
    ```