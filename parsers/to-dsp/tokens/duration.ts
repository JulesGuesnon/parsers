import { DspEntity, DurationToken } from '../../../types';

export class Duration extends DurationToken {
  constructor(token: Partial<DurationToken>) {
    super(token);
  }

  toDsp(): DspEntity {
    const { duration, unit } = this.value;

    return {
      class: 'token',
      type: 'color',
      id: this.id!,
      name: this.name,
      value: `${duration}${unit}`,
      tags: ['specify', 'duration'],
    };
  }
}
