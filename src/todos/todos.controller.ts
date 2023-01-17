import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DeleteResult } from 'typeorm';

import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

import { Todo } from './entities/todo.entity';

import { TodosService } from './todos.service';

@ApiTags('Todo')
@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  //---------------------------------------------------------------------------------------------------------//

  @Get()
  getTodos() {
    return this.todosService.getAllTodos();
  }

  @Get(':id')
  async getTodoById(@Param('id', new ParseIntPipe()) id: number) {
    const todo = await this.todosService.getTodoById(id);

    if (!todo) {
      throw new NotFoundException();
    }

    return todo;
  }

  @Post()
  createTodo(@Body() createTodoDto: CreateTodoDto): Promise<Todo> {
    const { label, endDate } = createTodoDto;

    return this.todosService.createTodo({
      label,
      endDate,
    });
  }

  @Patch(':id')
  async updateTodo(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() updateTodoDto: UpdateTodoDto,
  ) {
    const { label, endDate, isCompleted } = updateTodoDto;

    const todo = await this.todosService.getTodoById(id);

    if (!todo) {
      throw new NotFoundException();
    }

    await this.todosService.updateTodo(id, {
      label,
      endDate,
      isCompleted,
    });

    return this.todosService.getTodoById(id);
  }

  @Delete(':id')
  async deleteTodo(@Param('id', new ParseIntPipe()) id: number) {
    const todo = await this.todosService.getTodoById(id);

    if (!todo) {
      throw new NotFoundException();
    }

    return this.todosService.deleteTodoById(id);
  }

  @Delete()
  async deleteAllTodos() {
    return this.todosService.deleteAllTodos();
  }
}
