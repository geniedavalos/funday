import { Employee } from './employee';
import { Project } from './project';
export class Company {
  _id: string;
  name: string;
  owner: Employee;
  employees: [Employee];
  projects: [Project];
}
