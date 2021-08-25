import { Message } from "discord.js";
import { ICommand } from "../interfaces/ICommand";

const Ping: ICommand = {
  name: "play",
  description: "Ping Pong xD",
  aliases: ["p", "здфн"],
  run: async (message: Message, args: string[]) => {
    if (message.member?.voice.channel && !message.author.bot) {
    } else {
      await message.reply("Войдите в аудиоканал чтобы заказать трек");
    }
  },
};

export = Ping;
