import { TestBed } from "@angular/core/testing";
import { EmployeeService } from "./employee.service";
import type { Employee, EmployeeNode } from "../models/employee.model";

describe("EmployeeService", () => {
  let service: EmployeeService;

  const mockEmployee: Employee = {
    id: "1",
    firstName: "John",
    lastName: "Doe",
  };

  const mockEmployeeNode: EmployeeNode = {
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
        firstName: "Bob",
        lastName: "Johnson",
        subordinates: [
          {
            id: "4",
            firstName: "Alice",
            lastName: "Williams",
            subordinates: [],
          },
        ],
      },
    ],
  };

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeeService);

    spyOn(service, "getEmployees").and.returnValue([mockEmployee]);
    spyOn(service, "getEmployeeStructure").and.returnValue(mockEmployeeNode);
    spyOn(service, "getRootEmployee").and.returnValue(mockEmployeeNode);
  })

  it("should be created", () => {
    expect(service).toBeTruthy();
  })

  describe("selectedEmployee", () => {
    it("should initially be null", () => {
      expect(service.selectedEmployee()).toBeNull();
    })

    it("should update when selectEmployee is called", () => {
      service.selectEmployee(mockEmployee);
      expect(service.selectedEmployee()).toEqual(mockEmployee);
    })

    it("should be set to null when selectEmployee is called with null", () => {
      service.selectEmployee(mockEmployee);
      expect(service.selectedEmployee()).toEqual(mockEmployee);

      service.selectEmployee(null);
      expect(service.selectedEmployee()).toBeNull();
    })
  })

  describe("treeOrientation", () => {
    it("should initially be vertical", () => {
      expect(service.treeOrientation()).toEqual("vertical");
    })

    it("should toggle between vertical and horizontal", () => {
      expect(service.treeOrientation()).toEqual("vertical");

      service.toggleTreeOrientation();
      expect(service.treeOrientation()).toEqual("horizontal");

      service.toggleTreeOrientation();
      expect(service.treeOrientation()).toEqual("vertical");
    })
  })

  describe("displayMode", () => {
    it("should initially be subordinates", () => {
      expect(service.displayMode()).toEqual("subordinates");
    })

    it("should update when setDisplayMode is called", () => {
      service.setDisplayMode("superiors");
      expect(service.displayMode()).toEqual("superiors");

      service.setDisplayMode("full");
      expect(service.displayMode()).toEqual("full");

      service.setDisplayMode("subordinates");
      expect(service.displayMode()).toEqual("subordinates");
    })
  })

  describe("findEmployeeInStructure", () => {
    it("should find employee by id in the structure", () => {
      const result = service.findEmployeeInStructure(mockEmployeeNode, "3");

      expect(result).toBeTruthy();
      expect(result?.id).toEqual("3");
      expect(result?.firstName).toEqual("Bob");
    })

    it("should find nested employee by id in the structure", () => {
      const result = service.findEmployeeInStructure(mockEmployeeNode, "4")

      expect(result).toBeTruthy();
      expect(result?.id).toEqual("4");
      expect(result?.firstName).toEqual("Alice");
    })

    it("should return null if employee is not found", () => {
      const result = service.findEmployeeInStructure(mockEmployeeNode, "9");

      expect(result).toBeNull();
    })
  })

  describe("findPathToEmployee", () => {
    it("should find path to direct subordinate", () => {
      const path = service.findPathToEmployee(mockEmployeeNode, "2");

      expect(path).toBeTruthy();
      expect(path?.length).toEqual(2);
      expect(path?.[0].id).toEqual("1");
      expect(path?.[1].id).toEqual("2");
    })

    it("should find path to nested subordinate", () => {
      const path = service.findPathToEmployee(mockEmployeeNode, "4");

      expect(path).toBeTruthy();
      expect(path?.length).toEqual(3);
      expect(path?.[0].id).toEqual("1");
      expect(path?.[1].id).toEqual("3");
      expect(path?.[2].id).toEqual("4");
    })

    it("should return null if path is not found", () => {
      const path = service.findPathToEmployee(mockEmployeeNode, "9999");

      expect(path).toBeNull();
    })
  })

  describe("filterStructureToPath", () => {
    it("should filter structure to show path to employee", () => {
      const filtered = service.filterStructureToPath(mockEmployeeNode, "4");

      expect(filtered).toBeTruthy();
      expect(filtered?.id).toEqual("1");
      expect(filtered?.subordinates.length).toEqual(1);
      expect(filtered?.subordinates[0].id).toEqual("3");
      expect(filtered?.subordinates[0].subordinates.length).toEqual(1);
      expect(filtered?.subordinates[0].subordinates[0].id).toEqual("4");
      expect(filtered?.subordinates[0].subordinates[0].subordinates.length).toEqual(0);
    })

    it("should return null if employee is not found", () => {
      const filtered = service.filterStructureToPath(mockEmployeeNode, "9999");

      expect(filtered).toBeNull();
    })
  })
})
