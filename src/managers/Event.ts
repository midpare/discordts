import { ClientEvents } from "discord.js";

export class Event<T extends keyof ClientEvents> {
  public name: T;
  public execute: (...args: ClientEvents[T]) => any

  constructor(options: Event<T>) {
    this.name = options.name;
    this.execute = options.execute;
  }
}