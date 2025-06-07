import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { IdGeneratorService } from './id-generator.service';

@Injectable()
export class UuidGeneratorService implements IdGeneratorService {
  generate(): string {
    return uuidv4();
  }
}
