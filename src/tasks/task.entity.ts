import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from "typeorm";
import { TaskStatus } from './task-status.enum';
import { User } from '../auth/user.entity';


@Entity()
export class Task extends BaseEntity{
    @PrimaryGeneratedColumn({name:"id"})
    id:number;

    @Column()
    title:string;

    @Column()
    description:string;

    @Column()
    status: TaskStatus;

    @Column()
    userId:number;

    //INICIO DE RELATIONS
    @ManyToOne(type=> User, user=> user.tasks, {eager:false})
    user: User;
}