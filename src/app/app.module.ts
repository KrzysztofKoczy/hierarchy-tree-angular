import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { EmployeeTreeComponent } from './components/employee-tree/employee-tree.component';
import { LayoutToggleComponent } from './components/layout-toggle/layout-toggle.component';
import { DisplayModeToggleComponent } from './components/display-mode-toggle/display-mode-toggle.component';
import { EmployeeSelectorComponent } from './components/employee-selector/employee-selector.component';
import { EmployeeNodeComponent } from './components/employee-node/employee-node.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    EmployeeSelectorComponent,
    EmployeeTreeComponent,
    LayoutToggleComponent,
    DisplayModeToggleComponent,
    EmployeeNodeComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
