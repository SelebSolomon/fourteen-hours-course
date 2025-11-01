import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { SongsService } from './songs.service';
import { CreateSongDTO } from './dto/create-song-dto';

@Controller('songs')
export class SongsController {
  constructor(private readonly SongsService: SongsService) {}

  @Get()
  findAll() {
    try {
      return this.SongsService.findAll();
    } catch (error) {
      console.log(error.message);
      throw new HttpException(
        'Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
        {
          cause: error,
        },
      );
    }
  }

  @Post()
  create(@Body() CreateSongDTO: CreateSongDTO) {
    return this.SongsService.create(CreateSongDTO);
  }

  @Get('/:id')
  // @params('id', parseIntPipe) option 1
  findOne(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ) {
    return `fetched songs based on the id ${typeof id}`;
  }

  @Put('/:id')
  update() {
    return `updating songs`;
  }

  @Delete('/:id')
  delete() {
    return `Deleting songs`;
  }
}
