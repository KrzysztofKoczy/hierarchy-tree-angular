import { type ComponentFixture, TestBed } from "@angular/core/testing";
import { EmployeeTreeComponent } from "./employee-tree.component";
import { EmployeeService } from "../../services/employee.service";
import { EmployeeNodeComponent } from "../employee-node/employee-node.component";
import type { Employee, EmployeeNode } from "../../models/employee.model";
import { signal } from "@angular/core";
import { By } from "@angular/platform-browser";
import { CommonModule } from "@angular/common";

describe("EmployeeTreeComponent", () => {
  let component: EmployeeTreeComponent;
  let fixture: ComponentFixture<EmployeeTreeComponent>;
  let employeeService: jasmine.SpyObj<EmployeeService>;

  const mockRootNode: EmployeeNode = {
    id: "1",
    firstName: "John",
    lastName: "Doe",
    subordinates: [
      {
        id: "2",
        firstName: "Jane",
        lastName: "Smith",
        subordinates: [],
      },
      {
        id: "3",
        firstName: "Jan",
        lastName: "Kowalski",
        subordinates: [
          {
            id: "4",
            firstName: "Robert",
            lastName: "Malanowski",
            subordinates: [],
          },
        ],
      },
    ],
  };

  const mockEmployee: Employee = {
    id: "3",
    firstName: "Jan",
    lastName: "Kowalski",
  };

  beforeEach(async () => {
    const employeeServiceSpy = jasmine.createSpyObj(
      "EmployeeService",
      ["getRootEmployee", "findEmployeeInStructure", "filterStructureToPath", "findPathToEmployee", "selectEmployee"],
      {
        selectedEmployee: signal<Employee | null>(null),
        treeOrientation: signal("vertical"),
        displayMode: signal("subordinates"),
      },
    );

    employeeServiceSpy.getRootEmployee.and.returnValue(mockRootNode);

    await TestBed.configureTestingModule({
      imports: [CommonModule, EmployeeTreeComponent, EmployeeNodeComponent],
      providers: [{ provide: EmployeeService, useValue: employeeServiceSpy }],
    }).compileComponents()

    employeeService = TestBed.inject(EmployeeService) as jasmine.SpyObj<EmployeeService>;
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  })

  it("should create", () => {
    expect(component).toBeTruthy();
  })

  it("should load root employee on init", () => {
    expect(component.rootEmployee()).toEqual(mockRootNode);
  })

  it("should show message when no employee is selected", () => {
    employeeService.selectedEmployee.set(null);
    fixture.detectChanges();

    const noEmployeeMessage = fixture.debugElement.query(By.css(".no-employee"));
    
    expect(noEmployeeMessage).toBeTruthy();
    expect(noEmployeeMessage.nativeElement.textContent).toContain("Wybierz pracownika");
  })

  it("should show full tree when in full mode", () => {
    employeeService.selectedEmployee.set(mockEmployee);
    employeeService.displayMode.set("full");
    fixture.detectChanges();

    const employeeNode = fixture.debugElement.query(By.directive(EmployeeNodeComponent));

    expect(employeeNode).toBeTruthy();
    expect(employeeNode.componentInstance.employee).toEqual(mockRootNode);
  })

  it("should apply vertical class when orientation is vertical", () => {
    employeeService.selectedEmployee.set(mockEmployee);
    employeeService.treeOrientation.set("vertical");
    employeeService.findEmployeeInStructure.and.returnValue(mockRootNode);
    fixture.detectChanges();

    const treeContainer = fixture.debugElement.query(By.css(".tree-container"));

    expect(treeContainer.classes["vertical"]).toBeTrue();
    expect(treeContainer.classes["horizontal"]).toBeFalsy();
  })

  it("should apply horizontal class when orientation is horizontal", () => {
    employeeService.selectedEmployee.set(mockEmployee);
    employeeService.treeOrientation.set("horizontal");
    employeeService.findEmployeeInStructure.and.returnValue(mockRootNode);
    fixture.detectChanges();

    const treeContainer = fixture.debugElement.query(By.css(".tree-container"));

    expect(treeContainer.classes["vertical"]).toBeFalsy();
    expect(treeContainer.classes["horizontal"]).toBeTrue();
  })

  it("should correctly identify selected employee", () => {
    employeeService.selectedEmployee.set(mockEmployee)

    expect(component.isSelected({ ...mockEmployee, subordinates: [] })).toBeTrue()
    expect(component.isSelected({ id: "9999", firstName: "Test", lastName: "User", subordinates: [] })).toBeFalse()
  })
})
