import { Controller, Get, HttpCode, Param, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { CatsService } from './cats.service';

@Controller('cats')
export class CatsController {
  constructor(
    private readonly catsServices: CatsService
  ){}

  @Post()
  create(): string {
    return 'This action adds a new cat';
  }

  @Get()
  @HttpCode(201)
  findAll(): string {
    return this.catsServices.findAll()
  }

  @Get(':id')
  @HttpCode(201)
  findOne(@Param('id') id: string): string {
    return this.catsServices.findOne(id)
  }
}
