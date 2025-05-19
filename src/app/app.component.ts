import { Component, signal } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  title = "Hierarchia pracowników";
  isCollapsed = signal<boolean>(false);

  toggleCollapse(): void {
    this.isCollapsed.update((value) => !value);
  }
}
