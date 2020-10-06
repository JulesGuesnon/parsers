import { DspEntity, MeasurementToken } from '../../../types';

export class Measurement extends MeasurementToken {
  constructor(token: Partial<MeasurementToken>) {
    super(token);
  }
  toDsp(): DspEntity {
    return {
      class: 'token',
      type: 'size',
      id: this.id!,
      name: this.name,
      value: `${this.value.measure}${this.value.unit}`,
      tags: ['specify', 'measurement'],
    };
  }
}
