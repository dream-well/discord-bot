# Discord.js Command Handler Example
This is a basic example of a command handler for a Discord bot using the Discord.js library. The code shows how to define and register commands, handle incoming interactions, and interact with the Discord API to send messages and update roles.
# Installation and Setup

This project requires Node.js and npm.

1. Clone the GitHub repository:

```
git clone https://github.com/dream-well/discord-bot.git
```

2. Install the dependencies:

```
npm install
```

3. Create a `.env` file in the root directory:

```
TOKEN=<YOUR_BOT_TOKEN>
APPLICATION_ID=<YOUR_APPLICATION_ID>
INSCRIPTION_API=<YOUR_INSCRIPTION_API>
MONGO_URL=<YOUR_MONGO_URL>
MONGO_DB=<YOUR_MONGO_DATABASE>
BITCOIN_HOST=<YOUR_BITCOIN_HOST>
BITCOIN_PORT=<YOUR_BITCOIN_PORT>
BITCOIN_USERNAME=<YOUR_BITCOIN_USERNAME>
BITCOIN_PASSWORD=<YOUR_BITCOIN_PASSWORD>
```

4. Run the bot:

```
npm start
```

# Usage

The project is a Discord bot that allows users to configure their server to accept inscription IDs.

To configure the server, use the `/configure` command. This will prompt the user to enter a list of inscription IDs and select a role.

Once the server is configured, when a user joins the server, bot will send a register button to the user in welcome channel, or the user can use `/register` command to register their inscription IDs. This will open a modal containing two text inputs, one for the inscription ID and one for signature of the random message.

## License
This code is licensed under the MIT License.