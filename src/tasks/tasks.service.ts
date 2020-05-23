import { Injectable, NotFoundException } from '@nestjs/common';
//import { Task, TaskStatus } from './tasks.model';
import {  generator} from 'rand-token';
import { CreateTaskDto } from './dtos/create-task.dto';
import { GetTaskFilterDTO } from './dtos/filter-task.dto';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import {Task} from './task.entity'
import { DeleteResult } from 'typeorm';
import { TaskStatus } from './task-status.enum';
import { User } from '../auth/user.entity';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(TaskRepository)
        private taskRepository:TaskRepository
    ){}

    getTaskById = async(id: number, user: User) :Promise<Task> =>{
        const found = await this.taskRepository.findOne({where:{id, userId:user.id}});
        if(!found) throw new NotFoundException(`No fue encontrado ${id}`);
        return found;
    }
    createTask = async(user: User, createtaskDto: CreateTaskDto): Promise<Task> =>{
        return await this.taskRepository.createTask(user, createtaskDto);
    }
    deleteTaskByid = async(id:number, user: User): Promise<DeleteResult> =>{
        const deleted = await this.taskRepository.delete({id, userId:user.id});
        if(deleted.affected===0) throw new NotFoundException(`No se encontro la tarea con id ${id}`);
        return deleted;
    }
    getTasks = async(user: User, getTaskFilterDTO: GetTaskFilterDTO) : Promise<Task[]> =>{
        return await this.taskRepository.getTasks(user, getTaskFilterDTO);
    }


    updateTaskByid =  async(id:number, status:TaskStatus, user:User): Promise<Task> =>{
        const task : Task = await this.getTaskById(id, user);
        task.status= status;
        return await this.taskRepository.save(task)
    }

}
