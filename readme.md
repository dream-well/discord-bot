# Discord.js Command Handler Example
This is a basic example of a command handler for a Discord bot using the Discord.js library. The code shows how to define and register commands, handle incoming interactions, and interact with the Discord API to send messages and update roles.

## Installation
Clone this repository: git clone https://github.com/dream-well/discord-bot

Install dependencies: npm install

Set environment variables:

TOKEN: Your Discord bot's API token

INSRIPTION_API: The URL of an API endpoint that provides information about inscriptions (not used in this example)

Start the bot: npm start

## Usage
Once the bot is running, you can use the following commands:

/configure: Configures the bot with various settings (not implemented in this example)

/register: Prompts the user to enter an inscription ID and signature, and then verifies the signature against the inscription's Bitcoin address. If the signature is valid, the user is granted a role corresponding to the inscription 
ID.

When a new user joins the server, the bot sends a welcome message to the welcome-channel and prompts the user to register using the /register command.

## License
This code is licensed under the MIT License.