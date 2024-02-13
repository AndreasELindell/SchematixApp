import { Employee } from "./Employee";
import { Shift } from "./Shift";

export interface EmployeeWithShifts{
    employee: Employee,
    shifts: Shift[]
}