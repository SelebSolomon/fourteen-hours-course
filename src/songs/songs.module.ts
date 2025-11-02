import { Module } from '@nestjs/common';
import { SongsController } from './songs.controller';
import { SongsService } from './songs.service';
import { connection } from 'src/common/constants/connection';

// const monkSongsService = {
//   findAll() {
//     return [{ id: 1, title: 'lucile' }];
//   },
// };

@Module({
  controllers: [SongsController],
  providers: [
    SongsService,

    // {
    //   provide: SongsService,
    //   useClass: SongsService,
    // },

    // {
    //   provide: SongsService,
    //   useValue: monkSongsService,
    // },

    {
      provide: 'CONNECTION',
      useValue: connection,
    },
  ],
})
export class SongsModule {}
