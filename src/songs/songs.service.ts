import { Injectable } from '@nestjs/common';

@Injectable()
export class SongsService {
  private readonly songs: unknown[] = [];
  create(song) {
    // send the songs to the data base
    this.songs.push(song);
    return this.songs;
  }
  findAll() {
    // get the songs from the data base
    throw new Error('Error while trying to fetch all songs');
    return this.songs;
  }
}
