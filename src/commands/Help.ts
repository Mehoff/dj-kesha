import { Message, MessageEmbed } from "discord.js";
import { EmbedFieldData } from "discord.js";
import { ICommand } from "../interfaces/ICommand";
import CommandHandler from "../bot/CommandHandler";

const Help: ICommand = {
  name: "help",
  description: "Writes down every command that bot has",
  aliases: null,
  run: async (message: Message, args: string[]) => {
    const fieldDataArray: EmbedFieldData[] = [];

    let embed = new MessageEmbed();

    if (args.length > 0) {
      for (const arg of args) {
        const str = arg.toLowerCase();
        const command = CommandHandler.commands.find(
          (command) => command.name == str
        );
        if (command) {
          embed.setTitle(
            `**Helper for command: !${command.name} ${
              command.aliases
                ? `(${command.aliases.join(", ")})`
                : "(no aliases)"
            }**`
          );
          embed.setDescription(command.description);
        } else {
          embed.setDescription(`Command "${str}" was not found`);
        }
      }
    } else {
      embed.setTitle("**Commands list:**");
      for (const cmd of CommandHandler.commands.sort((a, b) => {
        if (a.name > b.name) return 1;
        if (a.name < b.name) return -1;
        return 0;
      })) {
        fieldDataArray.push({
          name: `${process.env.PREFIX}${cmd.name}`,
          value: `*${cmd.description}*`,
        });
      }
      embed.setFields(fieldDataArray);
    }
    await message.author.send({ embeds: [embed] });
  },
};

export = Help;
