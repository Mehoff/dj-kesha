import ITrack from "../interfaces/ITrack";
import {
  AudioResource,
  createAudioResource,
  demuxProbe,
} from "@discordjs/voice";

class Track implements ITrack {
  url: string;
  title: string;
  onStart: () => void;
  onFinish: () => void;
  onError: (error: Error) => void;

  constructor({ url, title, onStart, onFinish, onError }: ITrack) {
    this.url = url;
    this.title = title;
    this.onStart = onStart;
    this.onFinish = onFinish;
    this.onError = onError;
  }

  public createAudioResource(): Promise<AudioResource<Track>> {
    // Вернуть аудиоресурс в  MusicSubscription
  }
}

export = Track;
