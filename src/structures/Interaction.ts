import { InteractionType } from '../typings/Interaction';

export class Interaction {
  constructor(options: InteractionType) {
    Object.assign(this, options);
  }
}