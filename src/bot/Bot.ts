import {
  ApplicationCommand,
  Client,
  Collection,
  Intents,
  Interaction,
  Message,
  MessageEmbed,
  MessageEmbedOptions,
  Snowflake,
} from "discord.js";

import { City } from "../interfaces/ICity";
import cities from "../assets/cities.json";

import { registerCommands } from "./RegisterCommands";

const CITIES: City[] = cities as City[];

class Bot extends Client {
  constructor() {
    super({
      intents: [
        Intents.FLAGS.DIRECT_MESSAGES,
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_VOICE_STATES,
      ],
    });
  }

  public async init(): Promise<void> {
    this.on("ready", (client: Client) => {
      let commands;
      if (process.env.NODE_ENV === "development") {
        const guild = client.guilds.cache.get(
          process.env.DISCORD_DEVELOPMENT_GUILD_ID!
        );

        guild
          ? (commands = guild.commands)
          : (commands = client.application?.commands);
      }

      registerCommands(commands);
      console.log(`Ready at: ${new Date().toLocaleString()}`);
    });

    this.application?.commands;

    this.on("interactionCreate", async (interaction) => {
      if (!interaction.isCommand()) return;

      const { command, options } = interaction;

      switch (command?.name) {
        case "ping":
          interaction.reply({
            content: "Pong, pong",
            // Only use who send the command, can see the reply
            ephemeral: true,
          });
          break;
        case "weather":
          {
            await interaction.deferReply({});

            const city = options.getString("city")?.toLowerCase();

            if (!city) {
              interaction.editReply({ content: "Failed to fetch city name" });
              return;
            }

            //CITIES.find(c: any => c.name.toLowerCase() === city);
            const id = CITIES.find((c) => c.name.toLowerCase() === city)?.id;

            const response = await fetch(
              `api.openweathermap.org/data/2.5/weather?id=${id}&appid=${process.env.OPEN_WEATHER_MAP_API_KEY}`,
              { method: "GET" }
            ).then((r) => r.json());

            console.log(response);

            interaction.editReply({
              content: "Actual weather data",
            });
          }
          break;
      }
    });

    // this.on("messageCreate", async (message: Message) => {
    //   if (message.author.bot) return;
    // });

    this.login(process.env.DISCORD_TOKEN);
  }
}

export { Bot };
