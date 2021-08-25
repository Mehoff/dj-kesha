import {
  ApplicationCommand,
  Client,
  Collection,
  Intents,
  Interaction,
  Message,
  MessageEmbed,
  MessageEmbedOptions,
} from "discord.js";

import CommandHandler from "./CommandHandler";

class Bot extends Client {
  constructor() {
    super({
      intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
    });
    CommandHandler.init();
  }

  public async init(): Promise<void> {
    this.once("ready", (client: Client) =>
      console.log(`Ready!${new Date().toDateString()}`)
    );

    this.on("messageCreate", async (message: Message) => {
      if (message.author.bot) return;

      if (process.env.PREFIX) {
        if (message.content.startsWith(process.env.PREFIX)) {
          const input: string[] = message.content
            .split(process.env.PREFIX)[1]
            .split(" ");
          const commandName = input.shift();
          const args = input;

          if (commandName) CommandHandler.handle(commandName, args, message);
        }
      }
    });

    this.login(process.env.DISCORD_TOKEN);
  }
}

export { Bot };

// 16.08.2021 - 'interactionCreate doesn`t work at all on version "discord.js": "^13.0.1",'
