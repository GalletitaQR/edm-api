import { Query } from './../../../node_modules/@types/pg/index.d';
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Inject, Injectable } from '@nestjs/common';
import { CreateTaskDto } from '../auth/dto/task/create-task.dto';
import { Client } from 'pg';
import { Task } from '../auth/entities/task.entity';
import { UpdateTaskDto } from '../auth/dto/task/update_task.dto';
import { PrismaService } from '../../prisma.service';

@Injectable()
export class TaskService {

  constructor(
    @Inject('DATABASE_CONNECTION') private databaseConnection: Client,
    private prisma: PrismaService
  ) {

  }

  private tasks: Task[] = [];

  public async getTasks(): Promise<Task[]> {
    const tasks = await this.prisma.task.findMany();
    return tasks;
  }

  public async getTaskById(id: number): Promise<Task | null> {
    const task = await this.prisma.task.findUnique({
      where: { id },
    });
    return task;
  }

  public async insertTask(task: CreateTaskDto): Promise<Task> {
    const newtask = await this.prisma.task.create({
      data: task,});
    return newtask;
  }

public async updateTask(id: number, taskUpdated: UpdateTaskDto): Promise<Task>{
        // console.log(taskUpdated);
        const task = await this.prisma.task.update({
            where: {
                id: id
            },
            data: taskUpdated
        });
        return task;
}

  public async deleteTask(id: number): Promise<boolean> {
    const task = await this.prisma.task.delete({
      where: { id },
    });
    return !!task;
  }
}
