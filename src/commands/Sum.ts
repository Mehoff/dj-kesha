import { Message } from "discord.js";
import { ICommand } from "../interfaces/ICommand";

const Sum: ICommand = {
  name: "sum",
  description: "Sums all numbers in args",
  aliases: null,
  run: async (message: Message, args: string[]) => {
    let result = 0;

    for (const arg of args) {
      const num = parseInt(arg);
      if (isNaN(num)) {
        message.channel.send(`Ошибка, не число: ${arg}`);
        return;
      }
      result += num;
    }

    await message.reply(`${result}`);
  },
};

export = Sum;
