export class Employee {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  isManager: boolean;
  isOwner: boolean;
  department: string;
  managedProjects: string[];
  assignedProjects: string[];
}
