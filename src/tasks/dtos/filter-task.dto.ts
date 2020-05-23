import { IsIn, IsOptional } from 'class-validator';
import { TaskStatus } from '../task-status.enum';

export class GetTaskFilterDTO{
    @IsOptional()
    @IsIn([TaskStatus.NEW, TaskStatus.IN_PROGRESS, TaskStatus.DONE])
    status:TaskStatus;

    @IsOptional()
    search:string
}