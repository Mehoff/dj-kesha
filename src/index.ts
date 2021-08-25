import dotenv from "dotenv";
dotenv.config();

import { Bot } from "./bot/Bot";

const bot = new Bot();
bot.init();
