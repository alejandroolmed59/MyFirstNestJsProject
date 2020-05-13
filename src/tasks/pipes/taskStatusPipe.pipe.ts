import { PipeTransform, BadRequestException } from "@nestjs/common";
import { TaskStatus } from '../tasks.model';

export class TaskStatusPipe implements PipeTransform{
    readonly allowed=[TaskStatus.DONE, TaskStatus.IN_PROGRESS, TaskStatus.NEW];
    transform(value: any){
        if(this.isAllowed(value)){
            return value
        }else{
            throw new BadRequestException(`${value} no es un estado valido`)
        }
    }
    private isAllowed(status: any): boolean{
        const indice = this.allowed.indexOf(status);
        return indice===-1?false:true
    }
}