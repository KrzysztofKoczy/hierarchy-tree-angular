import {
  Component,
  type OnInit,
  inject,
  signal,
  computed,
  ChangeDetectionStrategy,
  ViewChild,
  type ElementRef,
  effect,
  type AfterViewChecked,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import type { EmployeeNode } from "../../models/employee.model";
import { EmployeeService } from "../../services/employee.service";
import { EmployeeNodeComponent } from "../employee-node/employee-node.component";
import { DisplayMode, OrientationMode } from "src/app/models/employee.type";

@Component({
  selector: "app-employee-tree",
  templateUrl: "./employee-tree.component.html",
  styleUrls: ["./employee-tree.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, EmployeeNodeComponent],
  standalone: true,
})
export class EmployeeTreeComponent implements OnInit, AfterViewChecked {
  @ViewChild("treeContainer") treeContainerRef!: ElementRef<HTMLDivElement>;

  employeeService = inject(EmployeeService);

  rootEmployee = signal<EmployeeNode | null>(null);
  shouldCenterView = signal<boolean>(false);

  displayedStructure = computed(() => {
    const selectedEmployee = this.employeeService.selectedEmployee();
    const displayMode = this.employeeService.displayMode();
    const root = this.rootEmployee();

    if (!root || (!selectedEmployee && displayMode !== "full")) {
      return null;
    }

    if (displayMode === "full") {
      return root;
    }

    if (displayMode === "subordinates") {
      return this.employeeService.findEmployeeInStructure(root, selectedEmployee!.id);
    }

    if (displayMode === "superiors") {
      return this.employeeService.filterStructureToPath(root, selectedEmployee!.id);
    }

    return null;
  })

  get orientation(): OrientationMode  {
    return this.employeeService.treeOrientation();
  }

  get displayMode(): DisplayMode {
    return this.employeeService.displayMode();
  }

  constructor() {
    effect(() => {
      const structure = this.displayedStructure();
      const orientationValue = this.orientation;
      const displayModeValue = this.displayMode;

      if (structure) {
        this.shouldCenterView.set(true)
      }
    }, { allowSignalWrites: true })
  }

  ngOnInit(): void {
    this.rootEmployee.set(this.employeeService.getRootEmployee());
  }

  ngAfterViewChecked(): void {
    if (this.shouldCenterView() && this.displayedStructure()) {

      if (this.treeContainerRef?.nativeElement) {
        this.centerSelectedEmployee();
      }

      this.shouldCenterView.set(false);
    }
  }

  selectEmployee(employee: EmployeeNode): void {
    this.employeeService.selectEmployee(employee);
  }

  isSelected(employee: EmployeeNode): boolean {
    const selectedEmployee = this.employeeService.selectedEmployee();

    return selectedEmployee ? selectedEmployee.id === employee.id : false;
  }

  isInPath(employee: EmployeeNode): boolean {
    const selectedEmployee = this.employeeService.selectedEmployee();

    if (!selectedEmployee) {
      return false;
    }

    if (this.displayMode === "full" || this.displayMode === "superiors") {
      const path = this.employeeService.findPathToEmployee(this.rootEmployee()!, selectedEmployee.id);

      return path ? path.some((node) => node.id === employee.id) : false;
    }

    return false;
  }

  private centerSelectedEmployee(): void {
    const selectedElement = this.treeContainerRef.nativeElement.querySelector(".employee-node.selected") as HTMLElement;

    if (selectedElement) {
      this.centerViaNative(selectedElement);
      return;
    }

    const rootElement = this.treeContainerRef.nativeElement.querySelector(".employee-node") as HTMLElement;

    if (rootElement) {
      this.centerViaNative(rootElement);
      return;
    } 
  }

  private centerViaNative(element: HTMLElement): void {
    element.scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "center",
    })
  }
}
