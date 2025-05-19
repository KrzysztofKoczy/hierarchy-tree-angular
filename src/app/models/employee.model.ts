export interface Employee {
  firstName: string;
  lastName: string;
  id: string;
}

export interface EmployeeNode extends Employee {
  subordinates: EmployeeNode[];
}