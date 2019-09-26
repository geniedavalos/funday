import { Employee } from './employee';
import { Task } from './task';

export class Project {
    _id: string;
    title: string;
    description: string;
    dueDate: Date;
    progress: number;
    isComplete: boolean;
    projectLead: Employee;
    teamMembers: string[];
    tasks: Task[];
}
