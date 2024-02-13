import { Time } from "@angular/common";
import { Branch } from "./Branch";
import { Employee } from "./Employee";
import { WorkTask } from "./WorkTask";

export interface Shift{
    id:number,
    start: string
    end: string,
    length: string,
    branch: Branch,
    employee: Employee,
    date: string,
    tasks: WorkTask[]
}