import { Employee } from './employee';

export class Task {
    _id: string;
    title: string;
    description: string;
    dueDate: any;
    progress: number;
    teamMembers: any[];
    constructor() {
      this.dueDate = new Date().toISOString().substr(0, 10);
    }
}
