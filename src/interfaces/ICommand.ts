import { Message } from "discord.js";

export interface ICommand {
  name: string;
  description: string;
  aliases: string[] | null;

  run: (message: Message, args: string[]) => Promise<void>;
}
