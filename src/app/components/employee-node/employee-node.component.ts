import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, forwardRef } from "@angular/core";
import { CommonModule } from "@angular/common";
import type { EmployeeNode } from "../../models/employee.model";
import type { OrientationMode } from "../../models/employee.type";

@Component({
  selector: "app-employee-node",
  templateUrl: "./employee-node.component.html",
  styleUrls: ["./employee-node.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, forwardRef(() => EmployeeNodeComponent)],
  standalone: true,
})
export class EmployeeNodeComponent {
  @Input() employee!: EmployeeNode;
  @Input() isSelected = false;
  @Input() isInPath = false;
  @Input() isSelectedFn!: (employee: EmployeeNode) => boolean;
  @Input() isInPathFn!: (employee: EmployeeNode) => boolean;
  @Input() orientation: OrientationMode = "vertical";
  @Output() select = new EventEmitter<EmployeeNode>();

  getFullName(employee: EmployeeNode): string {
    return `${employee.firstName} ${employee.lastName}`;
  }

  onSelect(employee: EmployeeNode): void {
    this.select.emit(employee);
  }
}
