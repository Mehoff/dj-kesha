import {
  ApplicationCommand,
  ApplicationCommandManager,
  GuildApplicationCommandManager,
  GuildResolvable,
  Constants,
} from "discord.js";

export const registerCommands = (
  commands:
    | ApplicationCommandManager<
        ApplicationCommand<{ guild: GuildResolvable }>,
        { guild: GuildResolvable },
        null
      >
    | GuildApplicationCommandManager
    | undefined
) => {
  commands?.create({
    name: "ping",
    description: "Replies with pong",
  });

  commands?.create({
    name: "play",
    description: "Plays music",
    options: [
      {
        name: "url",
        description: "Youtube video url",
        type: Constants.ApplicationCommandOptionTypes.STRING,
        required: true,
      },
    ],
  });

  commands?.create({
    name: "weather",
    description: "Gets city`s current weather",
    options: [
      {
        name: "city",
        description: "City name",
        type: Constants.ApplicationCommandOptionTypes.STRING,
        required: true,
      },
    ],
  });

  console.log(commands);
};
