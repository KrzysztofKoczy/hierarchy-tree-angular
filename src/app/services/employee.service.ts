import { Injectable, signal } from "@angular/core";
import { DisplayMode, OrientationMode } from "../models/employee.type";
import type { Employee, EmployeeNode } from "../models/employee.model";

import employeesData from "../data/employees.json";
import structureData from "../data/employee-structure.json";


@Injectable({
  providedIn: "root",
})
export class EmployeeService {
  selectedEmployee = signal<Employee | null>(null);
  treeOrientation = signal<OrientationMode>("vertical");
  displayMode = signal<DisplayMode>("subordinates");

  getEmployees(): Employee[] {
    return employeesData;
  }
  
  getEmployeeStructure(): EmployeeNode {
    return structureData;
  }

  findEmployeeInStructure(structure: EmployeeNode, employeeId: string): EmployeeNode | null {
    if (structure.id === employeeId) {
      return structure;
    }

    for (const subordinate of structure.subordinates) {
      const found = this.findEmployeeInStructure(subordinate, employeeId);

      if (found) {
        return found;
      }
    }

    return null;
  }

  findPathToEmployee(structure: EmployeeNode, employeeId: string, path: EmployeeNode[] = []): EmployeeNode[] | null {
    const currentPath = [...path, structure];

    if (structure.id === employeeId) {
      return currentPath;
    }

    for (const subordinate of structure.subordinates) {
      const foundPath = this.findPathToEmployee(subordinate, employeeId, currentPath);

      if (foundPath) {
        return foundPath;
      }
    }

    return null;
  }

  selectEmployee(employee: Employee | null): void {
    this.selectedEmployee.set(employee);
  }

  toggleTreeOrientation(): void {
    this.treeOrientation.update((current) => (current === "vertical" ? "horizontal" : "vertical"));
  }

  setDisplayMode(mode: DisplayMode): void {
    this.displayMode.set(mode);
  }

  getRootEmployee(): EmployeeNode {
    return this.getEmployeeStructure();
  }

  filterStructureToPath(structure: EmployeeNode, employeeId: string): EmployeeNode | null {
    if (structure.id === employeeId) {
      return { ...structure, subordinates: [] };
    }

    const filteredSubordinates: EmployeeNode[] = [];

    for (const subordinate of structure.subordinates) {
      const filtered = this.filterStructureToPath(subordinate, employeeId);
      
      if (filtered) {
        filteredSubordinates.push(filtered);
      }
    }

    if (filteredSubordinates.length > 0) {
      return { ...structure, subordinates: filteredSubordinates };
    }

    return null;
  }
}
