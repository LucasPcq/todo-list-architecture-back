import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

import { Todo } from './entities/todo.entity';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo)
    private todosRepository: Repository<Todo>,
  ) {}

  //---------------------------------------------------------------------------------------------------------//

  getAllTodos(): Promise<Todo[]> {
    return this.findAllTodos();
  }

  getTodoById(id: number): Promise<Todo | null> {
    return this.findTodoById(id);
  }

  createTodo({ label, endDate }: { label: string; endDate: Date }) {
    return this.insertTodo({
      title: label,
      end_date: endDate,
    });
  }

  async updateTodo(
    id: number,
    {
      label,
      endDate,
      isCompleted,
    }: {
      label?: string;
      endDate?: Date;
      isCompleted?: boolean;
    },
  ): Promise<UpdateResult> {
    return this.patchTodo(id, {
      title: label,
      end_date: endDate,
      completed: isCompleted,
    });
  }

  deleteTodoById(id: number): Promise<DeleteResult> {
    return this.deleteTodo(id);
  }

  deleteAllTodos(): Promise<void> {
    return this.clearTodos();
  }

  //---------------------------------------------------------------------------------------------------------//

  findTodoById(id: number): Promise<Todo | null> {
    return this.todosRepository.findOneBy({ id });
  }

  findAllTodos(): Promise<Todo[]> {
    return this.todosRepository.find({});
  }

  insertTodo({
    title,
    end_date,
  }: Pick<Todo, 'title' | 'end_date'>): Promise<Todo> {
    const todo = this.todosRepository.create({
      title,
      completed: false,
      end_date,
    });

    return this.todosRepository.save(todo);
  }

  patchTodo(
    id: number,
    { title, end_date, completed }: Partial<Todo>,
  ): Promise<UpdateResult> {
    return this.todosRepository.update(id, {
      title,
      end_date,
      completed,
    });
  }

  deleteTodo(id: number): Promise<DeleteResult> {
    return this.todosRepository.delete({ id });
  }

  clearTodos(): Promise<void> {
    return this.todosRepository.clear();
  }
}
