import { type ComponentFixture, TestBed } from "@angular/core/testing";
import { LayoutToggleComponent } from "./layout-toggle.component";
import { EmployeeService } from "../../services/employee.service";
import { By } from "@angular/platform-browser";
import { signal } from "@angular/core";

describe("LayoutToggleComponent", () => {
  let component: LayoutToggleComponent;
  let fixture: ComponentFixture<LayoutToggleComponent>;
  let employeeService: jasmine.SpyObj<EmployeeService>;

  beforeEach(async () => {
    const employeeServiceSpy = jasmine.createSpyObj("EmployeeService", ["toggleTreeOrientation"], {
      treeOrientation: signal("vertical"),
    });

    await TestBed.configureTestingModule({
      imports: [LayoutToggleComponent],
      providers: [{ provide: EmployeeService, useValue: employeeServiceSpy }],
    }).compileComponents();

    employeeService = TestBed.inject(EmployeeService) as jasmine.SpyObj<EmployeeService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutToggleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should toggle orientation when button is clicked", () => {
    const button = fixture.debugElement.query(By.css(".toggle-button")).nativeElement;
    
    button.click();

    expect(employeeService.toggleTreeOrientation).toHaveBeenCalled();
  });

  it("should update icon class when orientation changes", () => {
    employeeService.treeOrientation.set("horizontal");
    fixture.detectChanges();

    const icon = fixture.debugElement.query(By.css(".toggle-button"));
    expect(icon.classes["horizontal"]).toBeTrue();
    expect(icon.classes["vertical"]).toBeFalsy();
  });
})
