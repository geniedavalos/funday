import { EmployeeResolver } from './employee.resolver';
import { ProjectResolver } from './project.resolver';
import { TaskResolver } from './task.resolver';

export const resolvers: any[] = [
    EmployeeResolver,
    ProjectResolver,
    TaskResolver
]

export * from './project.resolver';
export * from './employee.resolver';
export * from './task.resolver';
export * from './company.resolver';
