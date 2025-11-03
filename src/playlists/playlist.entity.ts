// import { song } from 'src/songs/song.entity';
// import { user } from 'src/users/user.entity';

// import { Column, PrimaryGeneratedColumn } from 'typeorm';

// @Entity('playlists')
// export class Playlist {
//   @PrimaryGeneratedColumn()
//   id: number;

//   @Column()
//   name: string;

//   //   each playlist has multiple songs
//   @OneToMany(() => Songs (song) => song.playList)
//   songs: Song[]

// //   many playlist can belong to a single unique user
// @ManyToOne(() User => (user) => user.playLists)
// user: User 
// }
