import { InteractionType } from '../util/types/interaction';

export class Interaction {
  constructor(options: InteractionType) {
    Object.assign(this, options);
  }
}