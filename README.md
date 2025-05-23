# Employee Hierarchy Tree

An interactive web application for visualizing and navigating organizational structures. This tool allows users to explore employee hierarchies, view relationships between managers and subordinates, and navigate through different views of the organizational chart.

## 🚀 Live Demo

Check out the live application: [Employee Hierarchy Tree Demo](https://krzysztofkoczy.github.io/hierarchy-tree-angular/)

## 🌟 Features

- **Interactive Hierarchy Tree**: Visualize complex organizational structures with an intuitive tree interface

- **Multiple Display Modes**:
    - **Subordinates View**: Show only the selected employee and their subordinates
    - **Superiors View**: Display the path from the root to the selected employee
    - **Full Tree View**: View the entire organizational hierarchy

- **Flexible Orientation**: Toggle between vertical (top-down) and horizontal (left-to-right) tree layouts
- **Employee Search**: Quickly find employees with real-time filtering
- **Collapsible Controls**: Maximize workspace with a collapsible control panel
- **Automatic Centering**: Smooth scrolling to center the selected employee
- **Responsive Design**: Optimized for various screen sizes and devices

## 🛠️ Technologies

- **Angular CLI 16.0.1**
- **TypeScript**: Type-safe JavaScript
- **SCSS**: Advanced styling with variables and mixins
- **Angular Signals**: Reactive state management
- **Standalone Components**: Modern component architecture
- **OnPush Change Detection**: Performance optimization

## 🔧 Installation

npm install
ng serve
Open your browser and navigate to `http://localhost:4200`

## 📁 Project Structure

```plaintext
src/
├── app/
│   ├── components/
│   │   ├── display-mode-toggle/    # Toggle between display modes
│   │   ├── employee-node/          # Individual employee node
│   │   ├── employee-selector/      # Employee search and selection
│   │   ├── employee-tree/          # Main tree visualization
│   │   └── layout-toggle/          # Toggle between orientations
│   ├── models/                     # Data models and types
│   ├── services/                   # Services for data and state management
│   ├── data/                       # Sample employee data
│   └── app.component.*             # Root component
├── styles/                         # Global styles
└── assets/                         # Static assets
```

### Basic Navigation

1. **Select an Employee**: Use the dropdown to search and select an employee
2. **Change Display Mode**: Toggle between subordinates, superiors, or full tree views
3. **Change Orientation**: Switch between vertical and horizontal layouts
4. **Collapse Controls**: Use the chevron button to collapse/expand the control panel