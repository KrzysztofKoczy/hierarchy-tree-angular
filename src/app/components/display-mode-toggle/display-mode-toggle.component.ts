import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeService } from '../../services/employee.service';
import { DisplayMode } from 'src/app/models/employee.type';

@Component({
  selector: 'app-display-mode-toggle',
  templateUrl: './display-mode-toggle.component.html',
  styleUrls: ['./display-mode-toggle.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
  standalone: true,
})
export class DisplayModeToggleComponent {
  private employeeService = inject(EmployeeService);
  
  get displayMode(): DisplayMode {
    return this.employeeService.displayMode();
  }
  
  setDisplayMode(mode: DisplayMode): void {
    this.employeeService.setDisplayMode(mode);
  }
}