import { Task } from './task';

export class Project {
    _id: string;
    title: string;
    description: string;
    dueDate: Date;
    isComplete: boolean;
    projectLead: string;
    teamMembers: string[];
    tasks: Task[];
    progress: number;
}