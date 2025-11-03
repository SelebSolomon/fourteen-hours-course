import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Song } from './song.entity';
import { Repository } from 'typeorm';
import { CreateSongDTO } from './dto/create-song-dto';
import { UpdateSongDto } from './dto/update-song-dto';

@Injectable()
export class SongsService {
  // private readonly songs: unknown[] = [];
  constructor(
    @InjectRepository(Song)
    private songRepository: Repository<Song>,
  ) {}

  async create(songDTO: CreateSongDTO): Promise<Song> {
    const song = new Song();
    song.title = songDTO.title;
    song.artists = songDTO.artists;
    song.duration = songDTO.duration;
    song.lyrics = songDTO.lyrics;
    song.releasedDate = songDTO.releasedDate;
    return await this.songRepository.save(song);
    // method
  }

  async findAll(): Promise<{
    success: boolean;
    count: number;
    data: Song[];
  }> {
    const songs = await this.songRepository.find();
    return {
      success: true,
      count: songs.length,
      data: songs,
    };
  }

  async findOne(id: number): Promise<Song> {
    const song = await this.songRepository.findOneBy({ id });
    if (!song) {
      throw new NotFoundException(`Song with id ${id} not found`);
    }
    return song;
  }

  async update(
    id: number,
    recordToUpdate: UpdateSongDto,
  ): Promise<{
    success: boolean;
    message: string;
    data: Song;
  }> {
    await this.songRepository.update(id, recordToUpdate);

    const updated = await this.songRepository.findOne({ where: { id } });

    if (!updated) {
      throw new NotFoundException(`Song with ID ${id} not found`);
    }

    return {
      success: true,
      message: 'Song updated successfully',
      data: updated,
    };
  }
}
