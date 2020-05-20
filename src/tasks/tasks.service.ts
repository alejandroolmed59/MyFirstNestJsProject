import { Injectable, NotFoundException } from '@nestjs/common';
//import { Task, TaskStatus } from './tasks.model';
import {  generator} from 'rand-token';
import { CreateTaskDto } from './dtos/create-task.dto';
import { GetTaskFilterDTO } from './dtos/filter-task.dto';

@Injectable()
export class TasksService {

    /*
    getAllTasks=() =>{
        return [...this.tasks];
    }

    getTaskByFilter = (getTaskFilterDTO: GetTaskFilterDTO): Task[]=>{
        const {status, search} = getTaskFilterDTO;
        let tasks = this.getAllTasks();
        if(status){
            tasks = tasks.filter(task=>{
                return task.status===status
            })
        }
        return tasks;
    }

    createTask = (createtaskDto: CreateTaskDto):{status : string, task:Task} =>{
        const {title, description} = createtaskDto;
        const task : Task = {
            id: generator({chars:'numeric'}).generate(6),
            title,
            description,
            status: TaskStatus.NEW
        }
        this.tasks.push(task);
        return {status:'exito', task};
    }
    
    getTaskById = (id:string) : Task =>{

        const found= this.tasks.find(ts =>{
           return ts.id===id
         });
         if(!found) throw new NotFoundException(`No fue econtrador ${id}`);
         return found;
    }
    deleteTaskByid = (id:string) =>{
        
        this.tasks=this.tasks.filter(el =>
             el.id!==id
        )   
    }
    updateTaskByid = (id:string, status:TaskStatus): Task =>{
        const task : Task = this.getTaskById(id);
        task.status= status;
        return task;
    }*/

}
