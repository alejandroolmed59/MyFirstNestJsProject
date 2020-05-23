import { Repository, EntityRepository } from 'typeorm';
import { Task } from './task.entity';
import { CreateTaskDto } from './dtos/create-task.dto';
import { TaskStatus } from './task-status.enum';
import { GetTaskFilterDTO } from './dtos/filter-task.dto';
import { User } from '../auth/user.entity';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  getTasks = async (
    user: User,
    getTaskFilterDTO: GetTaskFilterDTO,
  ): Promise<Task[]> => {
    const { status, search } = getTaskFilterDTO;
    const query = this.createQueryBuilder('task');

    query.andWhere('task.userId= :id', {id:user.id});
    if (status) {
      query.andWhere('task.status = :status', { status });
    }
    if (search) {
      query.andWhere(
        'task.title LIKE :search OR task.description LIKE :search',
        { search: `%${search}%` },
      );
    }
    const tasks = await query.getMany();
    return tasks;
  };

  createTask = async (
    user: User,
    createTaskDto: CreateTaskDto,
  ): Promise<Task> => {
    const { title, description } = createTaskDto;
    const task = new Task();
    task.title = title;
    task.description = description;
    task.status = TaskStatus.NEW;
    task.user = user;
    await task.save();
    return task;
  };
}
