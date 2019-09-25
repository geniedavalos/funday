import { Employee } from './employee';

export class Task {
    _id: string;
    title: string;
    description: string;
    dueDate: Date;
    progress: number;
    teamMembers: [Employee];
}
