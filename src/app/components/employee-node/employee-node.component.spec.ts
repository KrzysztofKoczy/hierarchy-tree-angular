import { type ComponentFixture, TestBed } from "@angular/core/testing";
import { EmployeeNodeComponent } from "./employee-node.component";
import type { EmployeeNode } from "../../models/employee.model";
import { By } from "@angular/platform-browser";
import { CommonModule } from "@angular/common";

describe("EmployeeNodeComponent", () => {
  let component: EmployeeNodeComponent;
  let fixture: ComponentFixture<EmployeeNodeComponent>;

  const mockEmployee: EmployeeNode = {
    id: "1",
    firstName: "John",
    lastName: "Doe",
    subordinates: [
      {
        id: "2",
        firstName: "Jan",
        lastName: "Kowalski",
        subordinates: [],
      },
    ],
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, EmployeeNodeComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeNodeComponent);
    component = fixture.componentInstance;

    component.employee = mockEmployee;
    component.isSelectedFn = (employee: EmployeeNode) => employee.id === "1";
    component.isInPathFn = (employee: EmployeeNode) => employee.id === "1";

    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should display employee name", () => {
    const nameElement = fixture.debugElement.query(By.css(".employee-name")).nativeElement;

    expect(nameElement.textContent).toBe("John Doe");
  });

  it("should emit select event when employee node is clicked", () => {
    spyOn(component.select, "emit");

    const nodeElement = fixture.debugElement.query(By.css(".employee-node")).nativeElement;

    nodeElement.click();

    expect(component.select.emit).toHaveBeenCalledWith(mockEmployee);
  });

  it("should show vertical connector when orientation is vertical", () => {
    component.orientation = "vertical";
    fixture.detectChanges();

    const verticalConnector = fixture.debugElement.query(By.css(".vertical-connector"));

    expect(verticalConnector).toBeTruthy();
  });

  it("should show horizontal connector when orientation is horizontal", () => {
    component.orientation = "horizontal";
    fixture.detectChanges();

    const horizontalConnector = fixture.debugElement.query(By.css(".horizontal-connector"));

    expect(horizontalConnector).toBeTruthy();
  });

  it("should correctly format full name", () => {
    const fullName = component.getFullName(mockEmployee);
    
    expect(fullName).toBe("John Doe");
  });
})
