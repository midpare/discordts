import { InteractionType } from '../typings/interaction';

export class Interaction {
  constructor(options: InteractionType) {
    Object.assign(this, options);
  }
}