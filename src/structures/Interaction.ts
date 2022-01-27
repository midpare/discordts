import { InteractionType } from '../util/typings/interaction';

export class Interaction {
  constructor(options: InteractionType) {
    Object.assign(this, options);
  }
}