import { TaskStatus } from '../tasks.model';
import { IsIn, IsOptional } from 'class-validator';

export class GetTaskFilterDTO{
    @IsIn([TaskStatus.DONE, TaskStatus.IN_PROGRESS, TaskStatus.NEW])
    @IsOptional()
    status:TaskStatus;

    @IsOptional()
    search:string
}