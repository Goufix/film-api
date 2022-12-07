import { BadRequestException } from '@nestjs/common';

export function getNumberFromNumericString(numericString: string, field = 'The field') {
  const number = Number(numericString);

  if (isNaN(number)) {
    throw new BadRequestException(`${field} must be a numeric string`);
  }
}
