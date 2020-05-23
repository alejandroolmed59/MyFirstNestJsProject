import { Controller, Get, Post, Body, Param, Delete, Patch, Query, UsePipes, ValidationPipe, NotFoundException, ParseIntPipe, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dtos/create-task.dto';
import { GetTaskFilterDTO } from './dtos/filter-task.dto';
import { TaskStatusPipe } from './pipes/taskStatusPipe.pipe';
import { Task } from './task.entity';
import { DeleteResult } from 'typeorm';
import { TaskStatus } from './task-status.enum';
import { User } from '../auth/user.entity';
import { GetUser } from 'src/auth/get-user.decorator';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
    constructor(private taskService: TasksService){}

    @Get('')
    getTasks(
        @Query(ValidationPipe) getTaskFilterDTO: GetTaskFilterDTO,
        @GetUser() user:User
        ){
        return this.taskService.getTasks(user, getTaskFilterDTO);
    }

    @Get(':id')
    getTaskById(
        @Param('id', ParseIntPipe) id:number,
        @GetUser() user:User
        ) : Promise<Task> {
        return this.taskService.getTaskById(id, user);
    }
    @Post()
    @UsePipes(ValidationPipe)
    createTask(
        @Body() createTaskDto: CreateTaskDto,
        @GetUser() user:User
        ) : Promise<Task> {
        return  this.taskService.createTask(user, createTaskDto);

    }
    @Delete(':id')
    deleteTaskByid(
        @Param('id', ParseIntPipe) id:number,
        @GetUser() user: User
    ): Promise<DeleteResult>{
        return  this.taskService.deleteTaskByid(id, user)  
    }

    @Patch(':id/status')
    updateTaskByid(
        @Param('id', ParseIntPipe) id:number,
        @Body('status', TaskStatusPipe) status:TaskStatus,
        @GetUser() user:User
        ): Promise<Task>{
        return this.taskService.updateTaskByid(id, status, user);
    }  
}
