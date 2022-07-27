import { ClientEvents } from 'discord.js';

export class Event<T extends keyof ClientEvents> {
  public readonly name: T;
  public readonly execute: (...args: ClientEvents[T]) => Promise<void>

  constructor(options: Event<T>) {
    this.name = options.name;
    this.execute = options.execute;
  }
}