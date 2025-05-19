import { type ComponentFixture, TestBed } from "@angular/core/testing";
import { DisplayModeToggleComponent } from "./display-mode-toggle.component";
import { EmployeeService } from "../../services/employee.service";
import { By } from "@angular/platform-browser";
import { signal } from "@angular/core";

describe("DisplayModeToggleComponent", () => {
  let component: DisplayModeToggleComponent;
  let fixture: ComponentFixture<DisplayModeToggleComponent>;
  let employeeService: jasmine.SpyObj<EmployeeService>;

  beforeEach(async () => {
    const employeeServiceSpy = jasmine.createSpyObj("EmployeeService", ["setDisplayMode"], {
      displayMode: signal("subordinates"),
    });

    await TestBed.configureTestingModule({
      imports: [DisplayModeToggleComponent],
      providers: [{ provide: EmployeeService, useValue: employeeServiceSpy }],
    }).compileComponents();

    employeeService = TestBed.inject(EmployeeService) as jasmine.SpyObj<EmployeeService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayModeToggleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should have subordinates mode active by default", () => {
    const buttons = fixture.debugElement.queryAll(By.css(".toggle-button"));

    expect(buttons[0].classes["active"]).toBeTrue();
    expect(buttons[1].classes["active"]).toBeFalsy();
    expect(buttons[2].classes["active"]).toBeFalsy();
  });

  it("should set display mode to subordinates when first button is clicked", () => {
    const buttons = fixture.debugElement.queryAll(By.css(".toggle-button"));

    buttons[0].nativeElement.click();

    expect(employeeService.setDisplayMode).toHaveBeenCalledWith("subordinates");
  });

  it("should set display mode to superiors when second button is clicked", () => {
    const buttons = fixture.debugElement.queryAll(By.css(".toggle-button"));

    buttons[1].nativeElement.click();

    expect(employeeService.setDisplayMode).toHaveBeenCalledWith("superiors");
  });

  it("should set display mode to full when third button is clicked", () => {
    const buttons = fixture.debugElement.queryAll(By.css(".toggle-button"));

    buttons[2].nativeElement.click();

    expect(employeeService.setDisplayMode).toHaveBeenCalledWith("full");
  });

  it("should update active button when display mode changes", () => {
    employeeService.displayMode.set("superiors");
    fixture.detectChanges();

    const buttons = fixture.debugElement.queryAll(By.css(".toggle-button"));
    expect(buttons[0].classes["active"]).toBeFalsy();
    expect(buttons[1].classes["active"]).toBeTrue();
    expect(buttons[2].classes["active"]).toBeFalsy();

    employeeService.displayMode.set("full");
    fixture.detectChanges();

    expect(buttons[0].classes["active"]).toBeFalsy();
    expect(buttons[1].classes["active"]).toBeFalsy();
    expect(buttons[2].classes["active"]).toBeTrue();
  });
})
