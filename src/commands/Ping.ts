import { Message } from "discord.js";
import { ICommand } from "../interfaces/ICommand";

const Ping: ICommand = {
  name: "ping",
  description: "Ping Pong xD",
  aliases: ["pong"],
  run: async (message: Message, args: string[]) => {
    await message.reply("Pong");
  },
};

export = Ping;
