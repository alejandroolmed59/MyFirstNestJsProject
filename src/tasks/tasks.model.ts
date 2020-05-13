export interface Task{
    id:String,
    title:String,
    description:String,
    status: TaskStatus
}
export enum TaskStatus{
    NEW='NEW',
    IN_PROGRESS='IN_PROGRESS',
    DONE='DONE'
}
