import { Project } from './project';

export class Employee {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  isManager: boolean;
  department: string;
  managedProjects: string[];
  assignedProjects: string[];
}
