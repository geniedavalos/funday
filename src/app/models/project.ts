import { Task } from './task';

export class Project {
    _id: string;
    title: string;
    description: string;
    dueDate: any;
    isComplete: boolean;
    projectLead: any;
    teamMembers: string[];
    tasks: Task[];
    progress: number;
    constructor() {
      this.dueDate = new Date().toISOString().substr(0, 10);
    }
}
