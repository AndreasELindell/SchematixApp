import { Employee } from "./Employee";

export interface Branch{
    id: number,
    name: string,
    managerId: string,
    manager: Employee,
    employees: Employee[]
}