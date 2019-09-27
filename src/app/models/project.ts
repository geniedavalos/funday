import { Task } from './task';

export class Project {
    _id: string;
    title: string;
    description: string;
    dueDate: Date;
    progress: number;
    isComplete: boolean;
    projectLead: string;
    teamMembers: string[];
    tasks: Task[];
}
