import { type ComponentFixture, TestBed, fakeAsync, tick } from "@angular/core/testing";
import { EmployeeSelectorComponent } from "./employee-selector.component";
import { EmployeeService } from "../../services/employee.service";
import { FormsModule } from "@angular/forms";
import type { Employee } from "../../models/employee.model";
import { By } from "@angular/platform-browser";
import { signal } from "@angular/core";

describe("EmployeeSelectorComponent", () => {
  let component: EmployeeSelectorComponent
  let fixture: ComponentFixture<EmployeeSelectorComponent>
  let employeeService: jasmine.SpyObj<EmployeeService>

  const mockEmployees: Employee[] = [
    { id: "1", firstName: "John", lastName: "Doe" },
    { id: "2", firstName: "Bob", lastName: "Kowalski" },
    { id: "3", firstName: "Jane", lastName: "Smith" },
  ]

  beforeEach(async () => {
    const employeeServiceSpy = jasmine.createSpyObj("EmployeeService", ["getEmployees", "selectEmployee"], {
      selectedEmployee: signal<Employee | null>(null),
    })

    employeeServiceSpy.getEmployees.and.returnValue(mockEmployees);

    await TestBed.configureTestingModule({
      imports: [FormsModule, EmployeeSelectorComponent],
      providers: [{ provide: EmployeeService, useValue: employeeServiceSpy }],
    }).compileComponents()

    employeeService = TestBed.inject(EmployeeService) as jasmine.SpyObj<EmployeeService>;
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  })

  it("should load employees on init", () => {
    expect(component.employees()).toEqual(mockEmployees);
    expect(component.filteredEmployees()).toEqual(mockEmployees);
  })

  it("should not have a selected employee by default", () => {
    expect(component.selectedEmployeeId()).toBeNull();
  })

  it("should filter employees by first name", () => {
    const input = fixture.debugElement.query(By.css(".search-input")).nativeElement;

    input.value = "john";
    input.dispatchEvent(new Event("input"));
    fixture.detectChanges();

    expect(component.filteredEmployees().length).toBe(1);
    expect(component.filteredEmployees()[0].firstName).toBe("John");
  })

  it("should filter employees by last name", () => {
    const input = fixture.debugElement.query(By.css(".search-input")).nativeElement;

    input.value = "kowalski";
    input.dispatchEvent(new Event("input"));
    fixture.detectChanges();

    expect(component.filteredEmployees().length).toBe(1);
    expect(component.filteredEmployees()[0].lastName).toBe("Kowalski");
  })

  it("should select an employee when clicked", fakeAsync(() => {
    const input = fixture.debugElement.query(By.css(".search-input")).nativeElement;

    input.dispatchEvent(new Event("focus"));
    fixture.detectChanges();

    const employeeItems = fixture.debugElement.queryAll(By.css(".employee-item"));

    employeeItems[1].nativeElement.click();
    fixture.detectChanges();
    tick(200); 

    expect(employeeService.selectEmployee).toHaveBeenCalledWith(mockEmployees[1]);
    expect(component.searchTerm()).toBe("Bob Kowalski");
  }))

  it('should show "No results" when no employees match search', () => {
    const input = fixture.debugElement.query(By.css(".search-input")).nativeElement;

    input.value = "test";
    input.dispatchEvent(new Event("input"));
    fixture.detectChanges();

    expect(component.filteredEmployees().length).toBe(0);

    input.dispatchEvent(new Event("focus"));
    fixture.detectChanges();

    const noResults = fixture.debugElement.query(By.css(".no-results"));

    expect(noResults).toBeTruthy();
    expect(noResults.nativeElement.textContent.trim()).toBe("Brak wyników");
  })
})
