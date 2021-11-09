import { Snowflake } from "discord.js";
import { MusicSubscription } from "./MusicSubscription";

abstract class Subscriptions {
  public static MusicSubscriptions = new Map<Snowflake, MusicSubscription>();
}

export = Subscriptions;
