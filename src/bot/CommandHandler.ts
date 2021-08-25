import { Message } from "discord.js";
import { ICommand } from "../interfaces/ICommand";
import fs from "fs";

abstract class CommandHandler {
  public static commands: ICommand[];

  public static init() {
    this.commands = [];
    this._loadCommands();
  }

  public static async handle(
    userCommandInput: string,
    args: string[],
    message: Message
  ) {
    const command = this._getCommand(userCommandInput);
    if (command) {
      await command.run(message, args);
    }
  }

  private static _loadCommands() {
    fs.readdir("./src/commands", async (err, files) => {
      if (err) {
        console.log("Error white loading commands!", err);
        return;
      }
      const commandFiles = files.filter((file) => file.endsWith(".ts"));
      for (const file of commandFiles) {
        const command = (await import(`../commands/${file}`)) as ICommand;
        this.commands.push(command);
      }
    });
  }

  private static _getCommand(name: string): ICommand | null {
    const term = name.toLowerCase();
    if (this.commands) {
      for (const command of this.commands) {
        if (
          command.name === term ||
          command.aliases?.find((alias) => term === alias)
        )
          return command;
      }
    }
    return null;
  }
}

export = CommandHandler;

// class CommandHandler {
//   commands: ICommand[];

//   constructor() {
//     this.commands = [];
//     this._loadCommands();
//   }

//   public async handle(
//     userCommandInput: string,
//     args: string[],
//     message: Message
//   ) {
//     const command = this._getCommand(userCommandInput);
//     if (command) {
//       await command.run(message, args);
//     }
//   }

//   private _getCommand(name: string): ICommand | null {
//     const term = name.toLowerCase();
//     if (this.commands) {
//       for (const command of this.commands) {
//         if (
//           command.name === term ||
//           command.aliases?.find((alias) => term === alias)
//         )
//           return command;
//       }
//     }
//     return null;
//   }

//   private _loadCommands() {
//     fs.readdir("./src/commands", async (err, files) => {
//       if (err) {
//         console.log("Error white loading commands!", err);
//         return;
//       }
//       const commandFiles = files.filter((file) => file.endsWith(".ts"));
//       for (const file of commandFiles) {
//         const command = (await import(`../commands/${file}`)) as ICommand;
//         this.commands.push(command);
//         console.log(command);
//       }
//     });
//   }
// }

// export { CommandHandler };
