//import { TaskStatus } from '../tasks.model';
import { IsIn, IsOptional } from 'class-validator';
import { TaskStatus } from '../task-status.enum';

export class GetTaskFilterDTO{
    @IsOptional()
    status:TaskStatus;

    @IsOptional()
    search:string
}