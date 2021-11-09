import { Message, VoiceChannel } from "discord.js";
import { ICommand } from "../interfaces/ICommand";
import {
  VoiceConnection,
  AudioPlayer,
  joinVoiceChannel,
  VoiceConnectionState,
} from "@discordjs/voice";

import Subscriptions from "../classes/Subscriptions";

const Ping: ICommand = {
  name: "play",
  description: "Ping Pong xD",
  aliases: ["p", "здфн"],
  run: async (message: Message, args: string[]) => {
    if (message.member?.voice.channel && !message.author.bot) {
      if (message.guild) {
        let connection = joinVoiceChannel({
          channelId: message.member.voice.channel.id,
          guildId: message.member.guild.id,
          adapterCreator: message.member.guild.voiceAdapterCreator,
        });

        // Получаем/Создаем подписку на голосой канал определенного сервера из которого была вызвана команда !play
        const subscription = Subscriptions.MusicSubscriptions.get(
          message.member.guild.id
        );

        // хз надо чи не
        if (!subscription) {
          message.reply("Для начала зайди в голосовой канал, друг :)");
        }

        connection.on("error", (err) => {
          console.log(err);
        });

        connection.on(
          "stateChange",
          (oldState: VoiceConnectionState, newState: VoiceConnectionState) => {
            console.log(oldState.status + " | " + newState.status);
          }
        );
      }
    } else {
      await message.reply("Войдите в аудиоканал чтобы заказать трек");
    }
  },
};

export = Ping;
