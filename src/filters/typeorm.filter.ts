import { ArgumentsHost, Catch } from '@nestjs/common';
import { Response } from 'express';
import { QueryFailedError } from 'typeorm';

const ER_DUP_ENTRY = '23505';

@Catch(QueryFailedError)
export class QueryExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    if (exception.code === ER_DUP_ENTRY) {
      const regex = /(\S+)=(\S+)/i;
      const results = exception.detail.match(regex);
      const key = results[1].replace(/[()]/g, '');
      const value = results[2].replace(/[()]/g, '');

      return response.status(409).json({ [key]: value });
    }

    return response.status(500).json({ message: 'Internal error' });
  }
}
