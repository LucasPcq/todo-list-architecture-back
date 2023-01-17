import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional } from 'class-validator';
import { CreateTodoDto } from './create-todo.dto';

export class UpdateTodoDto extends CreateTodoDto {
  @IsOptional()
  label: string;

  @IsOptional()
  endDate: Date;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  isCompleted: boolean;
}
