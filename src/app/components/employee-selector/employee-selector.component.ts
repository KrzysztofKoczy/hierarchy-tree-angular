import { Component, type OnInit, inject, signal, effect, ChangeDetectionStrategy } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import type { Employee } from "../../models/employee.model";
import { EmployeeService } from "../../services/employee.service";

@Component({
  selector: "app-employee-selector",
  templateUrl: "./employee-selector.component.html",
  styleUrls: ["./employee-selector.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, FormsModule],
  standalone: true,
})
export class EmployeeSelectorComponent implements OnInit {
  private employeeService = inject(EmployeeService);

  filteredEmployees = signal<Employee[]>([]);
  selectedEmployeeId = signal<string | null>(null);
  searchTerm = signal<string>("");
  isDropdownOpen = signal<boolean>(false);
  employees = signal<Employee[]>([]);

  constructor() {
    effect(() => {
        const employee = this.employeeService.selectedEmployee();

        if (employee) {
          this.selectedEmployeeId.set(employee.id);
          this.searchTerm.set(`${employee.lastName} ${employee.firstName}`);
        }
      }, { allowSignalWrites: true })
  }

  ngOnInit(): void {
    const sortedEmployees = [...this.employeeService.getEmployees()].sort(
      (a, b) => a.lastName.localeCompare(b.lastName) || a.firstName.localeCompare(b.firstName),
    );

    this.employees.set(sortedEmployees);
    this.filteredEmployees.set(sortedEmployees);
  }

  onSearchChange(event: Event): void {
    const input = event.target as HTMLInputElement;

    this.searchTerm.set(input.value);
    this.filterEmployees();
  }


  selectEmployee(employee: Employee): void {
    this.employeeService.selectEmployee(employee);
    this.searchTerm.set(`${employee.firstName} ${employee.lastName}`);
    this.isDropdownOpen.set(false);
  }

  clearSelection(): void {
    this.employeeService.selectEmployee(null);
    this.searchTerm.set("");
    this.selectedEmployeeId.set(null);
    this.filterEmployees();
  }

  onFocus(): void {
    this.isDropdownOpen.set(true);
  }

  onBlur(): void {
    setTimeout(() => {
      this.isDropdownOpen.set(false);
    }, 200)
  }

  handleClickIcon(): void {
    this.isDropdownOpen.update((value) => !value);
  }

  getFullName(employee: Employee): string {
    return `${employee.lastName} ${employee.firstName}`;
  }

  trackEmployeeById(index: number, employee: Employee): string {
    return employee.id;
  }
  
  private filterEmployees(): void {
    const term = this.searchTerm().toLowerCase().trim();

    if (!term) {
      this.filteredEmployees.set(this.employees());
      return;
    }

    const filtered = this.employees().filter((employee) => {
      const fullNameStartFirst = `${employee.firstName} ${employee.lastName}`.toLowerCase();
      const fullNameSrartLast = `${employee.lastName} ${employee.firstName}`.toLowerCase();

      return fullNameStartFirst.includes(term) || fullNameSrartLast.includes(term);
    })

    this.filteredEmployees.set(filtered);
  }
}
