import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  // HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Inject,
  Scope,
  Query,
  DefaultValuePipe,
} from '@nestjs/common';
import { SongsService } from './songs.service';
import { CreateSongDTO } from './dto/create-song-dto';
import type { Connection } from 'src/common/constants/connection';
import { Song } from './song.entity';
import { UpdateSongDto } from './dto/update-song-dto';
import { Pagination } from 'nestjs-typeorm-paginate';
// import { UpdateResult } from 'typeorm';

@Controller({ path: 'songs', scope: Scope.DEFAULT })
export class SongsController {
  constructor(
    private readonly songsService: SongsService,
    @Inject('CONNECTION')
    private connection: Connection,
  ) {
    console.log(
      `THIS IS CONNECTION STRING ${this.connection.CONNECTION_STRING}`,
    );
  }
  @Get()
  findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe)
    page: number = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe)
    limit: number = 10,
  ): Promise<Pagination<Song>> {
    limit = limit > 100 ? 100 : limit;
    return this.songsService.paginate({
      page,
      limit,
    });
  }

  @Post()
  create(@Body() createSongDTO: CreateSongDTO): Promise<Song> {
    return this.songsService.create(createSongDTO);
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
    return this.songsService.findOne(id);
  }

  @Delete(':id')
  delete(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ) {
    return {
      success: true,
      message: `Song with ID ${id} deleted`,
    };
  }

  @Put('/:id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSongDto: UpdateSongDto,
  ) {
    return this.songsService.update(id, updateSongDto);
  }
}
