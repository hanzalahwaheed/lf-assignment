# Dummy Product Data Table

## Overview

This project showcases an interactive, feature-rich data table that fetches and displays product information from the DummyJSON API. While the DummyJSON API supports server-side filtering, sorting, and pagination, all these functionalities have been deliberately implemented on the frontend to demonstrate client-side logic handling and React proficiency.

## Features

### Core Requirements

- **Tabular Data Display** - Products are displayed in a clean table format

- **Column Sorting** - Sort by any column in ascending or descending order

- **Filtering** - Filter products by category, brand, price range, and rating

- **Pagination** - Navigate through products with a user-friendly pagination system

### Additional Features

- **Multi-column Sorting** - Hold Shift while clicking column headers to sort by multiple columns

- **Search Functionality** - Full-text search across product title, category, and brand fields.

- **Dual View Modes** - Seamless toggle between Table View and Grid View for improved usability—ideal for price, rating, and thumbnail-rich data.

- **Column Visibility Control** - Show/hide table columns via a customizable dropdown menu.

- **Active Filter Display** - Visual indicators to track and manage applied filters, with reset options.

- **Export to CSV** - Export the current view (filters and sorts applied) as a CSV file—helpful for data verification or external analysis (e.g., in Excel).

- **Debounced Inputs** - Built a generic, debounced input component for efficient and optimized user input handling.

## Technologies Used

- **Next.js**: React based framework for server-side rendering and routing
- **TypeScript**: For type safety and better developer experience
- **ShadCN**: UI Components like CheckBox, RadioGroup, ToolTips
- **Lucide React**: For UI icons
- **Tailwind CSS**: For styling and responsive design

## Local Setup

### Prerequisites

- Node.js (version 14.x or later)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone [repository-url]

# Navigate to project directory
cd lf-assignment

# Install dependencies
npm install
# or
yarn install
```

### Running the Application

```bash
# Development mode
npm run dev
# or
yarn dev

# Build for production
npm run build
# or
yarn build

# Start production server
npm start
# or
yarn start
```

## Potential Enhancements

- **Responsive Design**: Not implemented at the moment as the focus was on desktop functionality due to time constraints.

- **Paginated APIs**: Implement server-side pagination for better performance with large datasets
- **Customizable Table Settings**: Allow users to customize table layout and save preferences
- **Advanced Filtering**: Add date range filters and more complex filtering options
- **Drag-and-drop Column Reordering**: Enable users to reorder columns through drag-and-drop
- **Data Visualization**: Integrate charts or graphs for key product metrics insights.

## Author

**Hanzalah Waheed**
