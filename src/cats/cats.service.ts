import { Injectable } from '@nestjs/common';

@Injectable()
export class CatsService {

  findAll(): string {
    return 'Get all cats'
  }

  findOne(id: string): string {
    return `This action returns a #${id} cat`
  }
}
