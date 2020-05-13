import { Controller, Get, Post, Body, Param, Delete, Patch, Query, UsePipes, ValidationPipe, NotFoundException } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './tasks.model';
import { CreateTaskDto } from './dtos/create-task.dto';
import { GetTaskFilterDTO } from './dtos/filter-task.dto';
import { TaskStatusPipe } from './pipes/taskStatusPipe.pipe';

@Controller('tasks')
export class TasksController {
    constructor(private taskService: TasksService){}

    @Get()
    getTasks(@Query(ValidationPipe) getTaskFilterDTO: GetTaskFilterDTO): Task[]{
       // console.log(getTaskFilterDTO);
        if(Object.keys(getTaskFilterDTO).length) return this.taskService.getTaskByFilter(getTaskFilterDTO)
        else return this.taskService.getAllTasks();
    }

    @Post()
    @UsePipes(ValidationPipe)
    createTask(@Body() createTaskDto: CreateTaskDto) : {status : string, task:Task} {
        return this.taskService.createTask(createTaskDto);
    }

    @Get(':id')
    getTaskById(@Param('id') id:string) : Task {
        return this.taskService.getTaskById(id);
    }
    @Delete(':id')
    deleteTaskByid(@Param('id') id:string){
        this.taskService.deleteTaskByid(id);
    }
    @Patch(':id/status')
    updateTaskByid(@Param('id') id:string, @Body('status', TaskStatusPipe) status:TaskStatus): Task{
        return this.taskService.updateTaskByid(id, status);
    }
}
