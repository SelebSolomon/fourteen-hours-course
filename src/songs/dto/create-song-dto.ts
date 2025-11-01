import { IsArray,  IsDateString, IsMilitaryTime, IsNotEmpty, IsString } from 'class-validator';

export class CreateSongDTO {
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @IsArray()
  @IsNotEmpty()
  @IsString({each: true})
  readonly artists: string[];

  @IsDateString()
  @IsNotEmpty()
  readonly releasedData: Date;

  @IsMilitaryTime()
  @IsNotEmpty()
  readonly duration: Date;
}
