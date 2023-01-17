import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength, MaxLength, IsDateString } from 'class-validator';

export class CreateTodoDto {
  @ApiProperty()
  @IsString()
  @MinLength(5)
  @MaxLength(50)
  label: string;

  @ApiProperty()
  @IsDateString()
  endDate: Date;
}
